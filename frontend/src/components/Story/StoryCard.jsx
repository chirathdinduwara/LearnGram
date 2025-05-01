import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Story/story.css";

function StoryCard({ story }) {
  const [showPopup, setShowPopup] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const goback = () => {
    setShowPopup(false); // Close popup
    setTimerActive(false); // Stop timer
  };

  useEffect(() => {
    let timer;
    if (showPopup && timerActive) {
      timer = setTimeout(() => {
        navigate("/"); // Redirect to home
        window.location.reload(); // Refresh the page
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showPopup, timerActive, navigate]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/stories/${story.storyId}`);
    window.location.reload();
  };

  const openPopup = () => {
    setShowPopup(true);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  return (
    <>
      <div className="story-card" onClick={openPopup}>
        <img src={story.contentUrl} alt="story" className="story-img" />
        <h4>{story.userName}</h4>
      </div>

      {showPopup && (
        <div className="story-popup">
          <div className="story-popup-content" onClick={stopTimer}>
            <button className="backbtn" onClick={goback}>Back</button>
            <br />
            <img
              src={story.contentUrl}
              alt="Story Large"
              className="story-popup-image"
            />
            <h4>{story.userName}</h4>
            <p>{story.caption}</p>
            <small>{story.location}</small>
            <div className="story-popup-actions">
              {userEmail === story.userId && (
                <>
                  <button onClick={() => navigate(`/edit/${story.storyId}`)}>
                    Edit
                  </button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
            </div>
            {timerActive && (
              <div className="story-timer-bar">
                <div className="story-timer-fill"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default StoryCard;
