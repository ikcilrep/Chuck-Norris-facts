import React from "react"
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Jokes(props) {
    const classes = useStyles();

    const { jokes, jokesLoading } = props;
    if (jokesLoading) {
        return <div><CircularProgress /></div>;
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">

                {jokes.map(joke =>
                    (
                        <ListItem key={joke} >
                            <ListItemText primary={joke} />
                        </ListItem>)
                )}
            </List>
        </div>
    );
}