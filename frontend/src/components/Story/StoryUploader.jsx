import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function StoryUploader() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [existingStory, setExistingStory] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();
  const { storyId } = useParams();

  const userId = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const userProfileImage = localStorage.getItem("userImage");

  useEffect(() => {
    if (storyId) {
      axios
        .get(`http://localhost:8080/stories/${storyId}`)
        .then((res) => {
          const story = res.data;
          setExistingStory(story);
          setCaption(story.caption);
          setLocation(story.location);
        })
        .catch((err) => console.error("Error fetching story data", err));
    }
  }, [storyId]);

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleRemoveImage = () => setImage(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !location) {
      alert("Please fill in all fields");
      return;
    }

    try {
      let contentUrl = null;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        setIsUploading(true);

        const res = await axios.post(
          "http://localhost:8080/story/image",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        contentUrl = res.data;
        setIsUploading(false);
        setUploadProgress(0);
      }

      if (storyId) {
        await axios.patch(`http://localhost:8080/stories/${storyId}`, {
          userId,
          userName,
          contentUrl: contentUrl || existingStory.contentUrl,
          caption,
          userProfileImage,
          location,
        });
      } else {
        await axios.post("http://localhost:8080/stories", {
          userId,
          userName,
          contentUrl,
          caption,
          userProfileImage,
          location,
        });
      }

      navigate("/");
    } catch (err) {
      console.error("Error handling story", err);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="story-uploader">
      <h2>{storyId ? "Edit Story" : "Create Story"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        {image && (
          <div className="preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
            <button type="button" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        )}
        {!image && existingStory && existingStory.contentUrl && (
          <div className="preview">
            <img src={existingStory.contentUrl} alt="existing story" />
          </div>
        )}
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">{storyId ? "Update Story" : "Post Story"}</button>
      </form>

      {isUploading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Uploading Story...</h2>
            <div className="loading-bar">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p>{uploadProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryUploader;
