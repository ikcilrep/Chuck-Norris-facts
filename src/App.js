import React, { Component } from 'react';
import './App.css';
import Joke from './components/Joke'
import NavBar from './components/NavBar'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      joke: "",
      joke_loading: true,
    }
  }
  render() {
    const { categories, joke_loading, joke } = this.state;
    return (
      <div className="App">
        <NavBar categories={categories} />
        <Joke joke={joke} joke_loading={joke_loading} />
      </div>
    );
  }

  async getCategories() {
    const categoriesResponse = await axios.get("https://api.chucknorris.io/jokes/categories");
    return await categoriesResponse.data;
  }

  async getJoke(category) {
    const jokeResponse = await axios.get("https://api.chucknorris.io/jokes/random");
    return await jokeResponse.data.value;
  }

  async componentDidMount() {
    const categories = await this.getCategories();
    const joke = await this.getJoke();

    if (categories) {
      this.setState(
        { categories: categories }
      );
    }

    if (joke) {
      this.setState(
        { joke: joke, joke_loading: false }
      );
    }
  }
}

export default App;
