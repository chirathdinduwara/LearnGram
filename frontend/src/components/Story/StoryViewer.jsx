import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryCard from "./StoryCard";
    
function StoryViewer() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const res = await axios.get("http://localhost:8080/stories");
    setStories(res.data);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="story-viewer">
      {stories.map((story) => (
        <StoryCard key={story.storyId} story={story} />
      ))}
    </div>
  );
}

export default StoryViewer;
