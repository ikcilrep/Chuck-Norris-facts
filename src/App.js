import React, { Component } from 'react';
import './App.css';
import Joke from './components/Joke'
import NavBar from './components/NavBar'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_category: "any",
      categories: [],
      joke: "",
      joke_loading: true,
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  render() {
    const { categories, joke_loading, joke } = this.state;
    return (
      <div className="App">
        <NavBar handleCategoryChange={this.handleCategoryChange} categories={categories} />
        <Joke joke={joke} joke_loading={joke_loading} />
      </div>
    );
  }

  handleCategoryChange(new_category) {
    this.setState({
      current_category: new_category,
    })
    this.updateJoke();
  }

  async updateCategories() {
    const categoriesResponse = await axios.get("https://api.chucknorris.io/jokes/categories");
    const categories =  await categoriesResponse.data;
    if (categories) {
      this.setState(
        { categories: categories }
      );
    }

  }

  async updateJoke() {
    const { current_category } = this.state;
    let jokeResponse;
    if (current_category === "any") {
      jokeResponse = await axios.get("https://api.chucknorris.io/jokes/random");
    } else {
      jokeResponse = await axios.get('https://api.chucknorris.io/jokes/random', { params: { category: current_category } });
    }
    const joke = await jokeResponse.data.value;
    if (joke) {
      this.setState(
        { joke: joke, joke_loading: false }
      );
    }
  }

  async componentDidMount() {
    await this.updateCategories();
    await this.updateJoke();
  }
}

export default App;
