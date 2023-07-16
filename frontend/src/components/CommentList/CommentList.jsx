import Comment from '../Comment/Comment';
import './index.scss';

const CommentList = ({ comments }) => {

    return (
        <>
            <div className='container'>

                <div>
                    {
                        comments.length === 0 ? (<div> No comment posted </div>) : (
                            comments.map((item) => (
                                <Comment key={item._id} comment={item} />
                            ))
                        )}
                </div>

            </div>
        </>
    )
}

export default CommentList;