import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    if (!post) {
        return <div>No post available</div>; 
    }

    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title || 'No Title'}</h2>
                <p className="postDate">{post.datetime || 'No Date'}</p>
            </Link>
            <p className="postBody">
                {post.body
                    ? (post.body.length <= 25
                        ? post.body
                        : `${post.body.slice(0, 25)}...`)
                    : 'No Content' 
                }
            </p>
        </article>
    );
}

export default Post;
