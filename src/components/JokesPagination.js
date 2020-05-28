import React from 'react';
import { Pagination } from '@material-ui/lab';
export const JOKES_ON_PAGE_COUNT = 7;
export default function JokesPagination(props) {
    const { handlePageChange, jokesCount } = props;
    if (jokesCount <= JOKES_ON_PAGE_COUNT) {
        return <div></div>
    }

    const pagesCount = Math.ceil(jokesCount / JOKES_ON_PAGE_COUNT);
    return (<div>
        <Pagination 
            color="primary" 
            count={pagesCount} 
            onChange={(e, page) => handlePageChange(page)} />
    </div>)
}