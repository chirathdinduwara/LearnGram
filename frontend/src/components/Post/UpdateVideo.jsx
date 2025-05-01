import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateVideo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [post, setPost] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const userId = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userProfileImage = localStorage.getItem("userImage");

    const videoPreviewUrl = useMemo(() => {
        return video ? URL.createObjectURL(video) : null;
    }, [video]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${id}`);
                console.log("Post fetched:", response.data);
                setPost(response.data);
                setCaption(response.data.caption || "");
                setLocation(response.data.location || "");
            } catch (err) {
                console.error("Error fetching post:", err);
                toast.error("Failed to fetch post data.");
            }
        };
        fetchPost();
    }, [id]);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("video/")) {
                toast.error("Please select a valid video file.");
                return;
            }
            setVideo(file);
        }
    };

    const handleRemoveVideo = () => {
        setVideo(null);
        setPost((prev) => ({ ...prev, contentUrl: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption || !location || (!video && !post?.contentUrl)) {
            toast.error("Please fill all the fields and ensure a video is attached.");
            return;
        }

        try {
            setIsUploading(true);
            let contentUrl = post?.contentUrl || null;

            if (video) {
                const formData = new FormData();
                formData.append("video", video);

                const uploadRes = await axios.patch("http://localhost:8080/video", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                });

                contentUrl = uploadRes.data; // Make sure your backend returns just the video URL
            }

            await axios.patch(`http://localhost:8080/posts/${id}`, {
                userId,
                userName,
                contentUrl,
                caption,
                userProfileImage,
                location,
                type: 'vid'
            });

            setIsUploading(false);
            toast.success("Video updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error while updating post:", error);
            toast.error("Failed to update post.");
            setIsUploading(false);
        }
    };

    return (
        <div className="create-post">
            <h1 className="create-header">Update Video</h1>
            <form className="create-container" onSubmit={handleSubmit}>
                <div className="image-container">
                    {(video || post?.contentUrl) ? (
                        <div className="image-preview">
                            <video
                                controls
                                className="uploaded-video"
                                style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
                                src={videoPreviewUrl || post?.contentUrl}
                            />
                            <button type="button" className="remove-btn" onClick={handleRemoveVideo}>×</button>
                        </div>
                    ) : (
                        <input
                            className="imageInput"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                        />
                    )}
                </div>

                {isUploading && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Uploading Video...</h2>
                            <div className="loading-bar">
                                <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                            </div>
                            <p>{uploadProgress}%</p>
                        </div>
                    </div>
                )}

                <div className="left-form">
                    <textarea
                        className="login-input caption-input"
                        placeholder="Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        style={{ height: "100px", width: "400px" }}
                    />
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="create-post-btn" type="submit" disabled={isUploading}>
                        {isUploading ? "Updating..." : "Update Video"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateVideo;
