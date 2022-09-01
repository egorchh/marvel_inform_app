// Класс на чистом JS

class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=fd6aa250932e6506a5ae7e1e32a5bdb4";

  // функция позволяющая принимать данные с API и возвращать данные

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  // Создание списка персонажей с лимитом в 9

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=452&${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  // Создание конкретного перса

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  // метод для трансформации данных

  _transformCharacter = (char) => {
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
}

export default MarvelService;
