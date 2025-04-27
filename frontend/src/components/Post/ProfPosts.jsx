import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfPost from "./ProfPost";

function ProfPosts() {

    const [posts, setPosts] = useState([]);

    const userEmail = localStorage.getItem("userEmail");

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

    const userPosts = posts.filter(post => post.userId === userEmail);
    return (
        <>
            <div className="profList">
                {userPosts.slice().reverse().map((post) => (
                    <ProfPost
                        key={post.id}
                        img={post.contentUrl}
                    />
                ))}
            </div>
        </>
    );
}

export default ProfPosts;