import React, { Component } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default class CategoryMenu extends Component {
    render() {
        console.log(this.props);
        const { categories } = this.props;

        return (
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={this.props.anchorEl}
                    keepMounted
                    open={Boolean(this.props.anchorEl)}
                    onClose={this.props.handleClose}
                >
                    {
                        categories.map(c =>
                            <MenuItem key={c} onClick={this.props.handleClose}>{c}</MenuItem>)
                    }
                </Menu>
            </div>
        );

    }
}
