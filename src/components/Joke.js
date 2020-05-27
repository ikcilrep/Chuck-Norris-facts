import React, { Component } from "react"
import { CircularProgress } from '@material-ui/core';

export default class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true
        };
    }
    render() {
        const { joke, joke_loading } = this.props;
        if (joke_loading) {
            return <div><CircularProgress /></div>;
        }

        return (
            <div>
                <h1>
                    {joke}
                </h1>
            </div>
        );
    }

    async componentDidMount() {
        const data = await fetch("https://api.chucknorris.io/jokes/random");
        const dataJSON = await data.json();

        if (dataJSON) {
            this.setState(
                { data: dataJSON, loading: false }
            )
        }
    }
}