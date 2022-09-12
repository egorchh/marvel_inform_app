import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() =>
  import("../pages/SingleComicPage/SingleComicPage")
);
const SingleCharPage = lazy(() =>
  import("../pages/SingleCharacterPage/SingleCharPage")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

// Динамические импорты должны быть в самом конце, после статических

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicPage} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage Component={SingleCharPage} dataType="character" />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
