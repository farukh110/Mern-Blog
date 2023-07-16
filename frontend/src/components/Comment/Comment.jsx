import './inde.scss';

const Comment = ({ comment }) => {

    const date = new Date(comment.createdAt).toDateString();

    return (
        <div>
            {comment.authorUsername}
            <div>
                {date}
            </div>
            <div>
                {comment.content}
            </div>
        </div>
    )
}

export default Comment;