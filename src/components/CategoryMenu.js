import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default function CategoryMenu(props) {

    const { handleCategoryChange, handleClose, anchorEl, categories } = props;

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    categories.map(c => {
                        const onClick = () => {
                            handleCategoryChange(c);
                            handleClose();
                        };
                        return <MenuItem key={c} onClick={onClick}>{c}</MenuItem>
                    })
                }
            </Menu>
        </div>
    );


}
