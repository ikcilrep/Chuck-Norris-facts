import { Toolbar, IconButton, Typography, AppBar, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/More";
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'; import CategoryMenu from "../components/CategoryMenu";
import SearchField from "../components/SearchField";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none', [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
function getTitle(currentCategory) {
    if (currentCategory === 'any') {
        return "Chuck Norris facts";
    }
    return "Chuck Norris facts: " + currentCategory;
};

function getButton(searchFieldValue, updateJokes) {
    const getButtonValue = () => {
        if (searchFieldValue === "") {
            return "Next joke"
        }
        return "Search"
    }
    return (<Button color="inherit" onClick={updateJokes}>
        {
            getButtonValue(searchFieldValue)
        }
    </Button>
    )

}

export default function NavBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { searchFieldValue,
        updateJokes,
        currentCategory,
        categories,
        handleSearchFieldChange,
        handleSearchQueryChange,
        handleCategoryChange } = props;

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleDesktopMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <CategoryMenu
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            handleClose={handleMenuClose}
            anchorEl={anchorEl}
            id={menuId}
            open={isMenuOpen} />
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <CategoryMenu
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            handleClose={handleMobileMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen} />
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDesktopMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {getTitle(currentCategory)}
                    </Typography>
                    <SearchField
                        value={searchFieldValue}
                        classes={classes}
                        handleSearchQueryChange={handleSearchQueryChange}
                        handleSearchFieldChange={handleSearchFieldChange} />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    {
                        getButton(searchFieldValue, updateJokes, handleSearchQueryChange)
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

        </div>
    );
}

