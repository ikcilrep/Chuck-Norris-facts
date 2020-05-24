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
        const { data, loading } = this.state;
        if (loading) {
            return <div><CircularProgress /></div>;
        }

        return (
            <div>
                <h1>
                    {data.value}
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