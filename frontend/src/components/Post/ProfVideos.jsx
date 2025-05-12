import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function ProfVideos() {
    const [posts, setPosts] = useState([]);
    const [thumbnails, setThumbnails] = useState({});
    const [showMenu, setShowMenu] = useState(null);
    const navigate = useNavigate();
    const canvasRef = useRef(null);
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

    useEffect(() => {
        const generateThumbnails = async () => {
            const newThumbnails = {};
            for (const post of posts) {
                if (post.type === "vid") {
                    newThumbnails[post.postId] = await captureThumbnail(post.contentUrl);
                }
            }
            setThumbnails(newThumbnails);
        };

        if (posts.length > 0) {
            generateThumbnails();
        }
    }, [posts]);

    const captureThumbnail = (videoUrl) => {
        return new Promise((resolve) => {
            const video = document.createElement("video");
            video.crossOrigin = "anonymous";
            video.src = videoUrl;
            video.muted = true;
            video.playsInline = true;

            const handleSeeked = () => {
                const canvas = canvasRef.current;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL("image/png");
                resolve(thumbnail);
            };

            const handleMetadataLoaded = () => {
                video.currentTime = Math.min(2, video.duration / 2);
            };

            video.addEventListener("loadedmetadata", handleMetadataLoaded);
            video.addEventListener("seeked", handleSeeked);
            video.addEventListener("error", () => resolve("/default-thumbnail.jpg"));
        });
    };

    const handleReelsClick = (postId) => {
        navigate(`/reels/${postId}`);
    };

    const handleMenuClick = (postId) => {
        setShowMenu(showMenu === postId ? null : postId);
    };

    const handlePostClick = (postId) => {
        navigate(`/viewVideo/${postId}`);
    };

    // Show only posts from the correct user
    const filteredPosts = posts
        .filter(post => post.userId === targetEmail) // Show posts of the target user
        .filter(post => post.type === "vid")
        .reverse(); // Reverse for most recent first

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="profList">
                {filteredPosts.map((post) => (
                    <div className="post-thumbnail" key={post.postId}>
                        <img
                            src={thumbnails[post.postId] || "/default-thumbnail.jpg"}
                            alt="Video thumbnail"
                            className="video-thumbnail"
                            onClick={() => handlePostClick(post.postId)}
                        />

                        <div className="three-dot-icon" onClick={() => handleMenuClick(post.postId)}>
                            ⋮
                        </div>

                        {showMenu === post.postId && (
                            <div className="popup-menu">
                                <button onClick={() => handleReelsClick(post.postId)}>
                                    Go to Reels
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProfVideos;
