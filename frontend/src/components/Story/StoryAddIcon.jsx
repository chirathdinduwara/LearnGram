import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function StoryAddIcon() {
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const image = localStorage.getItem("userImage");
    const name = localStorage.getItem("userName");

    setUserImage(
      image ||
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
    );
    setUserName(name || "You");
  }, []);

  const goToForm = () => {
    Navigate("/createStory");
  };

  return (
    <div className="story-icon">
      <div className="story-img1">
        <img src={userImage} alt="User Avatar" className="story-profile" />
      </div>
      <p className="story-name">{userName}</p>
      <FaCirclePlus className="add-icon" onClick={goToForm} />
    </div>
  );
}

export default StoryAddIcon;
