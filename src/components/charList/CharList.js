import { Component } from "react/cjs/react.production.min";

import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  onCharsLoaded = (chars) => {
    this.setState({
      chars,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  render() {
    const { chars, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <Char chars={chars} props={this.props} />
    ) : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const Char = ({ chars, props }) => {
  return chars.map((item) => (
    <li
      key={item.id}
      className="char__item"
      onClick={() => props.onCharSelected(item.id)}
    >
      <img
        style={
          item.thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : {}
        }
        src={item.thumbnail}
        alt="Character"
      />
      <div className="char__name">{item.name}</div>
    </li>
  ));
};

export default CharList;
