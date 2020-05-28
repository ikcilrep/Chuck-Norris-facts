import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from '@material-ui/core'

export default function SearchField(props) {
    const { classes, handleSearchQueryChange } = props;
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSearchQueryChange(e);
        }
    }
    return (<div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            onKeyDown={handleKeyDown}
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
        />
    </div>);
}