import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <>
            <div className='container'>
                <h1> 404 </h1>
                <Link to='/'>
                    <button className='btn btn-primary'> Go Back on Home </button>
                </Link>
            </div>
        </>
    )
}

export default NotFound404;