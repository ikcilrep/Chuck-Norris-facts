import React, { Component } from 'react';
import { CircularProgress, Menu, MenuItem } from '@material-ui/core';

export default class CategoryMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true
        }
    }

    render() {
        const { loading, categories } = this.state;
        if (loading) {
            return <div><CircularProgress /></div>;
        }


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
                            <MenuItem onClick={this.props.handleClose}>{c}</MenuItem>)
                    }
                </Menu>
            </div>
        );

    }

    async componentDidMount() {
        const data = await fetch("https://api.chucknorris.io/jokes/categories");
        const dataJSON = await data.json();

        if (dataJSON) {
            this.setState(
                { categories: dataJSON, loading: false }
            )
        }
    }

}
