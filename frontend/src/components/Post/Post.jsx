import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark' });

function Post({ id, img, profile, caption, location, name, userId, onClick }) {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0); 

    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (userEmail) {
            axios.get(`http://localhost:8080/interactions/isLiked?postId=${id}&userEmail=${userEmail}`)
                .then(res => {
                    setLiked(res.data.liked); 
                })
                .catch(err => {
                    console.error("Failed to check like status:", err);
                });
        }

        
        axios.get(`http://localhost:8080/interactions/likeCount?postId=${id}`)
        .then(res => {
           
            console.log("Like count response:", res);

            
            if (res.data && res.data.likeCount !== undefined) {
                setLikeCount(res.data.likeCount);
            } else {
                console.error("Like count not found in the response");
            }
        })
        .catch(err => {
            console.error("Failed to fetch like count:", err);
        });
    }, [id, userEmail]);

    const handlePostClick = (postId) => {
        navigate(`viewPost/${postId}`);
    };

    const handleUserClick = (userId) => {
        navigate(`/viewProfile/${userId}`);
    };

    const handleLikeClick = () => {
        if (!userEmail) {
            alert("Please log in to like the post.");
            return;
        }

        if (!liked) {
            // Add Like
            axios.post(`http://localhost:8080/interactions/${id}/like?userEmail=${userEmail}`)
                .then(() => {
                    setLiked(true);
                    setLikeCount(prevCount => prevCount + 1); // Increment like count
                    toast('You Liked ❤');
                })
                .catch(err => console.error("Error liking post:", err));
        } else {
            // Remove Like
            axios.delete(`http://localhost:8080/interactions/${id}/like?userEmail=${userEmail}`)
                .then(() => {
                    setLiked(false);
                    setLikeCount(prevCount => prevCount - 1); // Decrement like count
                    toast('Like Removed ♡');
                })
                .catch(err => console.error("Error unliking post:", err));
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img
                    src={profile}
                    alt="Default Avatar"
                    className="story-profile"
                    style={{ width: "40px" }}
                    onClick={() => handleUserClick(userId)}
                />
                <div className="post-header-details">
                    <div className="post-header-details-left">
                        <p
                            className="post-u-name"
                            onClick={() => handleUserClick(userId)}
                            style={{ cursor: "pointer" }}
                        >
                            {name}
                        </p>
                        <p className="post-location">{location}</p>
                    </div>
                </div>
            </div>

            <div className="post-content">
                <img className="post-img" src={img} onClick={onClick} alt="Post" />
                
                {/* Like Button and Like Count */}
                <div className="post-actions">
                    <p onClick={handleLikeClick} style={{ cursor: "pointer" }} className="like-btn">
                        {liked 
                            ? <FaHeart color="red" size={30} />   
                            : <CiHeart size={30} />
                        }
                    </p>
                    <span style={{color:'white',fontFamily: 'Roboto, Times New Roman'}}>{likeCount} Likes</span> {/* Display the like count */}
                </div>

                <div className="post-caption">
                    <p
                        className="post-u-name"
                        onClick={() => handleUserClick(userId)}
                        style={{ cursor: "pointer" }}
                    >
                        {name}
                    </p>  
                    <p className="post-caption">{caption}</p>
                </div>
            </div>

            <div className="post-comment">
                <p onClick={() => handlePostClick(id)} className="view-comment">View All Comments</p>
                <p onClick={() => handlePostClick(id)} className="view-comment">Add a Comment...</p>
            </div>
        </div>
    );
}

export default Post;
