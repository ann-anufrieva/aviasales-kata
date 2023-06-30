/* eslint-disable class-methods-use-this */
class ServiseDB {
  constructor() {
    this.baseUrl = "https://aviasales-test-api.kata.academy";
  }

  async getResource(url) {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${result.status}`);
    }
    const body = await result.json();
    return body;
  }

  // получение id по которому получаем билеты
  async getSearchId() {
    return this.getResource(`${this.baseUrl}/search`);
  }
}

const getTickets = new ServiseDB();

export default getTickets;