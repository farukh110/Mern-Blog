import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './../../components/controls/TextInput/TextInput';
import './index.scss';
import { submitBlogPost } from './../../api/ApiService';
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');

    const author = useSelector(state => state.user._id);

    const getPhoto = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPhoto(reader.result);
        }
    }

    const submitHandler = async () => {

        const data = {
            author,
            title,
            content,
            photo
        };

        const res = await submitBlogPost(data);

        if (res.status === 201) {

            navigate("/");
        }
    }

    return (
        <>
            <div className='container my-md-5'>

                <div className='row'>
                    <div className='col-md-12'>

                        <h1> create a blog </h1>

                        <TextInput
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            className='form-control mt-md-3'
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className='form-control mt-md-3'
                            placeholder='your content goes here...'
                            maxLength={600}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <p className='mt-md-4'> choose a photo </p>

                        <div className='row'>

                            <div className='col-md-5'>

                                {photo !== "" ? <img className='img-fluid' src={photo} /> : ""}
                            </div>

                        </div>

                        <div className='row mt-md-5'>

                            <div className='col-md-5'>
                                <input
                                    type='file'
                                    name='photo'
                                    id='photo'
                                    accept='image/jpg, image/jpeg, image/png'
                                    onChange={getPhoto} />

                            </div>

                            <div className='col-md-7'>
                                <button
                                    className='btn btn-primary'
                                    onClick={submitHandler}
                                    disabled={title === '' || content === '' || photo === ''}
                                >
                                    Submit
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PostBlog;