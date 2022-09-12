import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=fd6aa250932e6506a5ae7e1e32a5bdb4";
  const _baseOffset = 367;

  // функция позволяющая принимать данные с API и возвращать данные

  // Создание списка персонажей с лимитом в 9

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  // Создание конкретного перса

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (charName) => {
    const res = await request(
      `${_apiBase}characters?name=${charName}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  // Получение списка комиксов с лимитом в 8

  const getAllComics = async (offset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  // Получение конкретного комикса

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  // метод для трансформации данных

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 160)}...`
        : "There is no description for this character...",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.slice(0, 10),
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      description: comics.description || "There is no description",
      price: comics.prices.price ? `${comics.prices.price}$` : "not available",
      language: comics.textObjects.language || "en-us",
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : "No information about the number of pages",
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
