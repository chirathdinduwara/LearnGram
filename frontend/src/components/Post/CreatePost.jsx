import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [image, setImage] = useState(null); 
    const [caption, setCaption] = useState(""); 
    const [location, setLocation] = useState(""); 

    const navigate = useNavigate();
    const userId = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); 
        }
    };

    const handleRemoveImage = () => {
        setImage(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption || !location) {
            alert("Please fill in the caption and location fields.");
            return;
        }

        try {
            let contentUrl = null;

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                // Upload the image to Spring Boot backend
                const imageResponse = await axios.post("http://localhost:8080/image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                contentUrl = imageResponse.data; // URL returned from backend
            }

            // Send post data including contentUrl to backend
            await axios.post("http://localhost:8080/posts", {
                userId,
                userName,
                contentUrl,
                caption,
                location
            });

            // Redirect after successful post
            navigate("/");

        } catch (error) {
            console.error("Error while saving post data:", error);
        }
    };

    return (
        <div className="create-post">
            <h1 className="create-header">Create a Post</h1>
            <form className="create-container" onSubmit={handleSubmit}>
            
                <div className="image-container">
                    {image ? (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(image)} alt="Uploaded Preview" className="uploaded-image" />
                            <button 
                                type="button" 
                                className="remove-btn" 
                                onClick={handleRemoveImage}
                            >
                                ✖
                            </button>
                        </div>
                    ) : (
                        <input
                            className="imageInput"
                            type="file"
                            onChange={handleImageChange}
                            disabled={!!image}
                        />
                    )}
                </div>
                
                <div className="left-form">
                    <textarea 
                        className="login-input caption-input"
                        placeholder="Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        style={{height: "100px", width: "400px"}}
                    />
                    <input 
                        type="text" 
                        className="login-input" 
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="create-post-btn" type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
