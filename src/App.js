import React, { Component } from 'react';
import './App.css';
import Jokes from './components/Jokes'
import NavBar from './containers/NavBar'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "any",
      searchQuery: "",
      categories: ['any'],
      jokes: "",
      jokesLoading: true,
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.updateJoke = this.updateJoke.bind(this);
  }
  render() {
    const { currentCategory, categories, jokesLoading, jokes } = this.state;
    return (
      <div className="App">
        <NavBar
          currentCategory={currentCategory}
          updateJoke={this.updateJoke} 
          handleCategoryChange={this.handleCategoryChange} 
          handleSearchQueryChange={this.handleSearchQueryChange} 
          categories={categories} />
        <Jokes jokes={jokes} jokesLoading={jokesLoading} />
      </div>
    );
  }

  handleSearchQueryChange(event) {
    event.persist();
    this.setState({
      searchQuery: event.target.value 
    }, this.updateJoke);
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
    const { searchQuery, currentCategory } = this.state;
    let jokes;
    if (searchQuery.length >= 3) {
      const jokesResponse = await axios.get("https://api.chucknorris.io/jokes/search", { params: { query: searchQuery } });
      jokes = jokesResponse.data.result.map(data => data.value);
    } else if (currentCategory === "any") {
      const jokeResponse = await axios.get("https://api.chucknorris.io/jokes/random");
      jokes = [jokeResponse.data.value];
    } else {
      const jokeResponse = await axios.get('https://api.chucknorris.io/jokes/random', { params: { category: currentCategory } });
      jokes = [jokeResponse.data.value];
    }
    if (jokes) {
      this.setState(
        { jokes: jokes, jokesLoading: false }
      );
    }
  }

  async componentDidMount() {
    await this.updateCategories();
    await this.updateJoke();
  }
}

export default App;
