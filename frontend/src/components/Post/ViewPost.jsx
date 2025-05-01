import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function ViewPost() {
    const { id } = useParams(); 
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const userId = localStorage.getItem("userEmail"); 

    
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const closePopup = () => {
        setShowOptions(false);
    };


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                // Handle error here if needed
            }
        };

        fetchPost();
    }, []);

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this post?")) {
            axios.delete(`http://localhost:8080/posts/${id}`)
                .then(() => {
                    alert("Post deleted successfully");
                    navigate("/profile");
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                    alert("Failed to delete post");
                });
        }
    }
    

    return (
        <>
            <div className="view-post-container">
            <div className="view-post">
                <div className="left-post">
                    <img src={post.contentUrl} className="views-post-img"/>
                </div>
                <div className="right-post">
                    <div className="right-post-header">
                        <div className="right-post-header-left">
                        <img
                            src={post.userProfileImage}
                            alt="Default Avatar"
                            className="story-profile"
                            style={{width: "40px", }}
                        />
                        <div className="right-post-header-details">
                            <p className="post-u-name">{post.userName}</p>
                            <p className="post-u-location">{post.location}</p>
                        </div>
                        </div>
                        {post.userId === userId && (
                            <div className="right-post-header-right" onClick={toggleOptions}>
                                ...
                            </div>
                        )}

                        {showOptions && (
                        <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <ul>
                                <li className='pop-up-nav'>
                                <Link className="pop-up-nav" to={`/editPost/${post.postId}`}>
                                    Edit Post
                                </Link>
                                </li>
                                
                                <li style={{color: "#ED4956"}} onClick={() => handleDelete(post.postId)}>Delete</li>
                            </ul>
                        </div>
                    </div>
                        )}
                    </div>
                    <hr className='line' />
                    
                </div>
            </div>
            </div>
        </>
    );
}

export default ViewPost;