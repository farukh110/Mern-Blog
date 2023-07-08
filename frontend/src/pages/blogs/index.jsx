import React, { useEffect, useState } from 'react';
import './index.scss';
import { getAllblogs } from '../../api/ApiService';
import Loader from '../../components/controls/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();

    const getBlogs = async () => {

        const res = await getAllblogs();

        if (res.status === 200) {

            setBlogs(res.data.blogs);
        }
    }

    useEffect(() => {

        getBlogs();
        setBlogs([]);

    }, []);

    if (blogs.length === 0) {
        return <Loader />
    }

    return (
        <>
            <div className='container'>

                <h1>
                    Blogs
                </h1>

                <div className='row'>

                    {
                        blogs.map((item) => (
                            <div className='col-md-4' onClick={() => navigate(`/blog/${item._id}`)} key={item._id}>

                                <img className='img-fluid' src={item.photo} />
                                <h3> {item.title} </h3>
                                <p> {item.content} </p>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    )
}

export default Blogs;