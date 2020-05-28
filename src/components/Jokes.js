import React from "react"
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { JOKES_ON_PAGE_COUNT } from './JokesPagination';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function getJokesOnPage(jokes, page) {
    const jokesOnPageBeginIndex = JOKES_ON_PAGE_COUNT * (page - 1);
    return jokes.slice(jokesOnPageBeginIndex, jokesOnPageBeginIndex + JOKES_ON_PAGE_COUNT);
}

export default function Jokes(props) {
    const classes = useStyles();

    const { page, jokes, jokesLoading } = props;
    if (jokesLoading) {
        return <div><CircularProgress /></div>;
    }


    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {getJokesOnPage(jokes, page).map(joke =>
                    (
                        <ListItem key={joke} >
                            <ListItemText primary={joke} />
                        </ListItem>)
                )}
            </List>
        </div>
    );
}