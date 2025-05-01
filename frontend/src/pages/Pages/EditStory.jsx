import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStory() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/stories/${storyId}`).then((res) => {
      setCaption(res.data.caption);
      setLocation(res.data.location);
    });
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8080/stories/${storyId}`, {
      caption,
      location,
    });
    navigate("/stories");
  };

  return (
    <div className="edit-story">
      <h2>Edit Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStory;
