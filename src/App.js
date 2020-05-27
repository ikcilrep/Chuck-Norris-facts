import React, { Component } from 'react';
import './App.css';
import Joke from './components/Joke'
import NavBar from './containers/NavBar'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "any",
      currentSearchQuery: "",
      categories: ['any'],
      joke: "",
      jokeLoading: true,
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.updateJoke = this.updateJoke.bind(this);
  }
  render() {
    const { currentCategory, categories, jokeLoading, joke } = this.state;
    return (
      <div className="App">
        <NavBar currentCategory={currentCategory} updateJoke={this.updateJoke} handleCategoryChange={this.handleCategoryChange} categories={categories} />
        <Joke joke={joke} jokeLoading={jokeLoading} />
      </div>
    );
  }

  handleCategoryChange(newCategory) {
    this.setState({
      currentCategory: newCategory,
    }, this.updateJoke);
  }

  async updateCategories() {
    const categoriesResponse = await axios.get("https://api.chucknorris.io/jokes/categories");
    const categories = await categoriesResponse.data;
    if (categories) {
      categories.push('any');
      this.setState(
        { categories: categories }
      );
    }

  }

  async updateJoke() {
    const { currentSearchQuery, currentCategory } = this.state;
    let jokeResponse;
    if (currentSearchQuery !== "") {
      jokeResponse = await axios.get("https://api.chucknorris.io/jokes/search", { params: { query: currentSearchQuery } });
    } else if (currentCategory === "any") {
      jokeResponse = await axios.get("https://api.chucknorris.io/jokes/random");
    } else {
      jokeResponse = await axios.get('https://api.chucknorris.io/jokes/random', { params: { category: currentCategory } });
    }
    const joke = await jokeResponse.data.value;
    if (joke) {
      this.setState(
        { joke: joke, jokeLoading: false }
      );
    }
  }

  async componentDidMount() {
    await this.updateCategories();
    await this.updateJoke();
  }
}

export default App;
