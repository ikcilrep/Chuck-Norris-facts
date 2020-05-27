import React, { Component } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default class CategoryMenu extends Component {
    render() {
        console.log(this.props);
        const { handleCategoryChange, handleClose, anchorEl, categories } = this.props;

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
}
