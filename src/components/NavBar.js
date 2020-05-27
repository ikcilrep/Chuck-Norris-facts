import { Button, Toolbar, IconButton, Typography, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CategoryMenu from "./CategoryMenu";

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { current_category, updateJoke, handleCategoryChange, categories } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTitle = () => {
        if (current_category === 'any') {
            return "Chuck Norris facts";
        }
        return "Chuck Norris facts: " + current_category;
    };

    return (<AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <CategoryMenu categories={categories} handleCategoryChange={handleCategoryChange} handleClick={handleClick} handleClose={handleClose} anchorEl={anchorEl} />
            <Typography variant="h6" className={classes.title}>
                {getTitle()}
            </Typography>
            <Button color="inherit" onClick={updateJoke}>Next joke</Button>
        </Toolbar>
    </AppBar>);
}