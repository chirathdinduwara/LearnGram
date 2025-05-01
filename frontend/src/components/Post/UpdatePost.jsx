import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdatePost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [post, setPost] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const userId = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userProfileImage = localStorage.getItem("userImage");

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Remove the image
    const handleRemoveImage = () => {
        setImage(null);
        if (post?.contentUrl) {
            setPost({ ...post, contentUrl: null });
        }
    };

    // Fetch existing post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${id}`);
                setPost(response.data);
                setCaption(response.data.caption || "");
                setLocation(response.data.location || "");
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        fetchPost();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption || !location) {
            alert("Please fill in the caption and location fields.");
            return;
        }

        try {
            setIsUploading(true);
            let contentUrl = null;

            // Upload image if provided
            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                const imageResponse = await axios.post("http://localhost:8080/image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                });

                contentUrl = imageResponse.data; // New image URL after upload
            }

            // Determine final content URL (existing or new)
            const finalContentUrl = contentUrl !== null
                ? contentUrl
                : post?.contentUrl || null;

            // Update the post with the new data
            await axios.patch(`http://localhost:8080/posts/${id}`, {
                userId,
                userName,
                contentUrl: finalContentUrl,
                caption,
                userProfileImage,
                location
            });

            setIsUploading(false);
            navigate("/profile");
        } catch (error) {
            console.error("Error while saving post data:", error);
            setIsUploading(false);
        }
    };

    return (
        <div className="create-post">
            <h1 className="create-header">Update Post</h1>
            <form className="create-container" onSubmit={handleSubmit}>

                <div className="image-container">
                    {image ? (
                        <div className="image-preview">
                            <button type="button" className="remove-btn" onClick={handleRemoveImage}>×</button>
                            <img src={URL.createObjectURL(image)} alt="Uploaded Preview" className="uploaded-image" />
                        </div>
                    ) : post?.contentUrl ? (
                        <div className="image-preview">
                            <button type="button" className="remove-btn" onClick={handleRemoveImage}>×</button>
                            <img src={post.contentUrl} alt="Existing" className="uploaded-image" />
                        </div>
                    ) : (
                        <input
                            className="imageInput"
                            type="file"
                            onChange={handleImageChange}
                        />
                    )}
                </div>

                {/* Modal for uploading progress */}
                {isUploading && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Uploading Image...</h2>
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
                        {isUploading ? "Updating..." : "Update Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePost;
