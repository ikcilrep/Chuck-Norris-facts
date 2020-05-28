import React from "react"
import { CircularProgress } from '@material-ui/core';

export default function Joke(props)  {
    const { joke, jokeLoading } = props;
    if (jokeLoading) {
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