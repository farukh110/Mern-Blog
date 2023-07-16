import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBlogById, deleteBlog, postComment, getCommentsById } from '../../api/ApiService';
import CommentList from '../../components/CommentList/CommentList';
import './index.scss';
import Loader from '../../components/controls/Loader/Loader';

const BlogDetails = () => {

    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);
    const [ownsBlog, setOwnsBlog] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    const params = useParams();
    const blogId = params.id;

    const username = useSelector(state => state.user.username);
    const userId = useSelector(state => state._id);

    const onDeleteBlog = async () => {

        let res;

        try {

            res = await deleteBlog(blogId);

            if (res.status === 200) {
                navigate('/');
            }

        } catch (error) {
            return error;
        }

    }

    const getBlogDetails = async () => {

        const commentResponse = await getCommentsById(blogId);

        if (commentResponse.status === 200) {

            setComments(commentResponse.data.data);
        }

        const blogResponse = await getBlogById(blogId);

        if (blogResponse.status === 200) {
            setOwnsBlog(username === blogResponse.data.blog.authorUsername);
            setBlog(blogResponse.data.blog);
        }
    }

    const onPostComment = async () => {

        const data = {
            author: userId,
            blog: blogId,
            content: newComment
        };

        const res = await postComment(data);

        try {

            if (res.status === 201) {
                setNewComment("");
                setReload(!reload);
            }

        } catch (error) {
            return error;
        }

    }

    useEffect(() => {

        getBlogDetails();

    }, [reload]);

    if (blog.length === 0) {
        return <Loader />
    }


    return (
        <>
            <div className='container'>

                <div className='row'>
                    <div className='col-md-6'>

                        <div>

                            <p>
                                @{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString()}
                            </p>

                            <div>
                                <img className='img-fluid' src={blog.photo} alt='' />
                            </div>

                            <p>
                                {blog.content}
                            </p>

                            {
                                ownsBlog && (<div>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => { navigate(`/blog/update/${blog._id}`) }}>
                                        edit
                                    </button>
                                    <button className='btn btn-danger' onClick={onDeleteBlog}> delete </button>
                                </div>)
                            }

                        </div>

                    </div>
                    <div className='col-md-6'>

                        <div className='comments-area'>

                            <CommentList comments={comments} />

                            <div className='post-comment'>

                                <input
                                    placeholder='comment goes here...'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button className='btn btn-primary' onClick={onPostComment}> post comment </button>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogDetails;