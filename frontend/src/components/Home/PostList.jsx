import Post from "../Post/Post";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function PostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts');
                setPosts(response.data);
            } catch (err) {
                // Handle error here if needed
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (id) => {
        navigate(`/viewPost/${id}`);
    };

    return (
        <>
            <div className="postList">
                {posts.slice().reverse().map((post) => (
                    <Post
                        key={post.id}
                        img={post.contentUrl}
                        caption={post.caption}
                        location={post.location}
                        name={post.userName}
                        profile={post.userProfileImage}
                        onClick={() => handlePostClick(post.postId)}
                    />
                ))}
            </div>
        </>
    );
}

export default PostList;
