import { Toolbar, IconButton, Typography, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar(props) {
    const classes = useStyles();
    return (<AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Chuck Norris jokes
      </Typography>
        </Toolbar>
    </AppBar>);
}