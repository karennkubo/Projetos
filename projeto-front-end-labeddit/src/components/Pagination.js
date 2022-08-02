import React from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export const Pagination = ({ postsPerPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(100 / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='pagination mt-3'>
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <Button variant='dark' onClick={() => paginate(number)} className='dark mb-3'>
                        {number}
                    </Button> {' '}

                </li>
            ))}
        </nav>
    )
}
export default Pagination;
