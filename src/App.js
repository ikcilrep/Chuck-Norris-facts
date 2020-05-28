import React, { Component } from 'react';
import './App.css';
import Jokes from './components/Jokes';
import NavBar from './containers/NavBar';
import JokesPagination from './components/JokesPagination';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "any",
      searchQuery: "",
      categories: ['any'],
      jokes: [],
      jokesLoading: true,
      searchFieldValue: "",
      page: 1
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateJokes = this.updateJokes.bind(this);
  }
  render() {
    const { page, searchQuery, currentCategory, categories, jokesLoading, jokes } = this.state;
    return (
      <div className="App">
        <NavBar
          searchFieldValue={searchQuery}
          currentCategory={currentCategory}
          updateJokes={this.updateJokes}
          handleCategoryChange={this.handleCategoryChange}
          handleSearchQueryChange={this.handleSearchQueryChange}
          handleSearchFieldChange={this.handleSearchFieldChange}
          categories={categories} />
        <center>
          <Jokes jokes={jokes} jokesLoading={jokesLoading} page={page} />
        </center>
        <JokesPagination
          jokesCount={jokes.length}
          handlePageChange={this.handlePageChange} />
      </div>
    );
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handleSearchFieldChange(newValue) {
    this.setState({ searchQuery: newValue });
  }

  handleSearchQueryChange(event) {
    event.persist();
    let searchQuery = event.target.value;
    if (searchQuery !== "" && searchQuery.length < 3) {
      searchQuery = ` ${searchQuery} `; 
    }

    this.setState({
      searchQuery: searchQuery,
      currentCategory: "any"
    }, this.updateJokes);
  }

  handleCategoryChange(newCategory) {
    this.handleSearchFieldChange("");
    this.setState({
      currentCategory: newCategory,
    }, this.updateJokes);
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

  async updateJokes() {
    this.setState({ jokesLoading: true }, async () => {
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
          {
            page: 1,
            jokes: jokes,
            jokesLoading: false
          }
        );
      }
    });
  }

  async componentDidMount() {
    await this.updateCategories();
    await this.updateJokes();
  }
}

export default App;
