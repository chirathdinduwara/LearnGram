import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiPickerEmpty, CiTrash } from "react-icons/ci";

function ViewVideo() {
    const { id } = useParams();
    const [videoPost, setVideoPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const userId = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userImage = localStorage.getItem("userImage");

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");

    const toggleOptions = () => setShowOptions(!showOptions);
    const closePopup = () => setShowOptions(false);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/interactions/post/${id}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/interactions/post`, {
                postId: id,
                userId,
                userName,
                userProfilePic: userImage,
                comment: userComment
            });
            setUserComment("");
            fetchComments();
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    useEffect(() => {
        const fetchVideoPost = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/posts/${id}`);
                setVideoPost(res.data);
            } catch (err) {
                console.error("Error fetching video post:", err);
            }
        };
        fetchVideoPost();
    }, [id]);

    const handleDelete = async (postId) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await axios.delete(`http://localhost:8080/posts/${postId}`);
                alert("Video deleted successfully");
                navigate("/profile");
            } catch (err) {
                console.error("Error deleting video:", err);
                alert("Failed to delete video");
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await axios.delete(`http://localhost:8080/interactions/${commentId}`);
                fetchComments();
            } catch (err) {
                console.error("Error deleting comment:", err);
            }
        }
    };

    const openEditPopup = (comment) => {
        setEditCommentId(comment.id);
        setEditCommentText(comment.comment);
        setShowEditPopup(true);
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8080/interactions/${editCommentId}`, {
                comment: editCommentText
            });
            setShowEditPopup(false);
            fetchComments();
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    };

    return (
        <>
            <div className="view-post-container">
                <div className="view-post">
                    <div className="left-post">
                        <video
                            className="views-post-img"
                            src={videoPost.contentUrl}
                            controls
                            style={{ width: "100%", maxHeight: "500px", borderRadius: "10px" }}
                        />
                    </div>

                    <div className="right-post-container">
                        <div className="right-post">
                            <div className="right-post-header">
                                <div className="right-post-header-left">
                                    <img
                                        src={videoPost.userProfileImage}
                                        alt="User"
                                        className="story-profile"
                                        style={{ width: "40px" }}
                                    />
                                    <div className="right-post-header-details">
                                        <p className="post-u-name">{videoPost.userName}</p>
                                        <p className="post-u-location">{videoPost.location}</p>
                                    </div>
                                </div>
                                {videoPost.userId === userId && (
                                    <div className="right-post-header-right" onClick={toggleOptions}>
                                        ...
                                    </div>
                                )}
                                {showOptions && (
                                    <div className="popup-overlay" onClick={closePopup}>
                                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                            <ul>
                                                <li>
                                                    <Link className="pop-up-nav" to={`/editVideo/${videoPost.postId}`}>
                                                        Edit Video
                                                    </Link>
                                                </li>
                                                <li style={{ color: "#ED4956" }} onClick={() => handleDelete(videoPost.postId)}>
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr className="line" />

                            <div className="right-post-content">
                                <div className="right-post-header-left">
                                    <img
                                        src={videoPost.userProfileImage}
                                        alt="User"
                                        className="story-profile"
                                        style={{ width: "40px" }}
                                    />
                                    <div className="right-post-header-details">
                                        <p className="post-u-name">{videoPost.userName}</p>
                                        <p className="post-u-caption">{videoPost.caption}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="right-post-comments-sec scrollable-comments">
                                {comments.slice().reverse().map((comment) => (
                                    <div key={comment.id} className="right-post-header-left comments">
                                        <img
                                            src={comment.userProfilePic}
                                            alt="Commenter"
                                            className="story-profile"
                                            style={{ width: "30px" }}
                                        />
                                        <div className="right-post-header-details commenter">
                                            <div>
                                                <p className="post-u-name">{comment.userName}</p>
                                                <p className="post-u-caption">{comment.comment}</p>
                                            </div>
                                            {(comment.userId === userId || videoPost.userId === userId) && (
                                                <div className='comment-actions'>
                                                    <CiPickerEmpty
                                                        className='comment-actions-btn'
                                                        color='green'
                                                        size={"20"}
                                                        onClick={() => openEditPopup(comment)}
                                                    />
                                                    <CiTrash
                                                        className='comment-actions-btn'
                                                        color='red'
                                                        size={"20"}
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="line" />
                        <div className="add-comment">
                            <form className="add-comment-sec" onSubmit={handleAddComment}>
                                <input
                                    className="comment-input"
                                    type="text"
                                    placeholder="Add a Comment"
                                    value={userComment}
                                    required
                                    onChange={(e) => setUserComment(e.target.value)}
                                />
                                <button type="submit" className="subm-comment">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showEditPopup && (
                <div className="modal-overlay" onClick={() => setShowEditPopup(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form className="edit-comment-form" onSubmit={handleUpdateComment}>
                            <h4 className="modal-title">Edit Comment</h4>
                            <input
                                type="text"
                                className="edit-comment-input"
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-update">Update</button>
                                <button type="button" className="btn btn-cancel" onClick={() => setShowEditPopup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewVideo;
