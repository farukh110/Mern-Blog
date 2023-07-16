import { useState, useEeffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById, updateBlogData } from '../../api/ApiService';
import { useSelector } from 'react-redux';
import './index.scss';

const UpdateBlog = () => {

    const params = useParams();
    const blogId = params.id;

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [content, setContent] = useState("");

    const updateBlog = async () => {

        const res = await getBlogById(blogId);

        if (res.status === 200) {

            setTitle(res.data.blog.title);
            setPhoto(res.data.blog.photo);
            setContent(res.data.blog.content);
        }

    }

    const getPhoto = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPhoto(reader.result);
        }
    }

    const author = useSelector(state => state.user._id);

    const updateHandler = async () => {

        let data;

        if (photo.includes('http')) {

            data = {
                author,
                title,
                content,
                blogId
            };
        } else {

            data = {
                author,
                title,
                content,
                photo,
                blogId
            };
        }

        const res = await updateBlogData(data);

        if (res.status === 201) {

            navigate("/");
        }
    }

    useEeffect(() => {

        updateBlog();

    }, []);


    return (
        <>
            <div className='container my-md-5'>

                <div className='row'>
                    <div className='col-md-12'>

                        <h1> update your blog </h1>

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

                                <img className='img-fluid' src={photo} />
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
                                    onClick={updateHandler}>
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

export default UpdateBlog;