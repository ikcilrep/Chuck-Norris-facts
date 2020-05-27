import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default function CategoryMenu(props) {

    const {
        open,
        id,
        handleCategoryChange,
        handleClose,
        anchorEl,
        categories } = props;

    return (
        <div>
            <Menu
                open={open}
                id={id}
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
