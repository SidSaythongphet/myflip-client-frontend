import React from 'react';
import PostCard from './PostCard';

const PostContainer = ({ posts, currentUser, onDeletePost }) => {
    console.log(posts)
    const renderPosts = posts.map(post => <PostCard key={ post.id } post={ post } currentUser={ currentUser } onDeletePost={ onDeletePost } />)

    return (
        <div>
            PostContainer
            {renderPosts}
        </div>
    )
}

export default PostContainer