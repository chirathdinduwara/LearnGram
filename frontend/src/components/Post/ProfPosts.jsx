import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfPost from "./ProfPost";
import { useNavigate, useParams } from "react-router-dom";

function ProfPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams(); // userId from route (profile/:userId)

    const loggedInEmail = localStorage.getItem("userEmail");
    const targetEmail = userId || loggedInEmail; // fallback to logged-in user

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts');
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (id) => {
        navigate(`/viewPost/${id}`);
    };

    // Show only posts created by the correct user
    const filteredPosts = posts
        .filter(post => post.userId === targetEmail)
        .filter(post => post.type === "img" || post.type === null)
        .reverse();

    return (
        <div className="profList">
            {filteredPosts.map((post) => (
                <ProfPost
                    key={post.postId}
                    img={post.contentUrl}
                    onClick={() => handlePostClick(post.postId)}
                />
            ))}
        </div>
    );
}

export default ProfPosts;
