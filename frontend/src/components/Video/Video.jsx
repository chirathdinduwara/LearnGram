import React, { useRef, useEffect, useState } from "react";
import { CiVolumeMute, CiVolumeHigh, CiPlay1 } from "react-icons/ci";

function Video({videoURL, userName, location, caption, profile }) {
  const videoRef = useRef();
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseBtn, setShowPauseBtn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPaused(false);
          setShowPauseBtn(false);
        } else {
          videoRef.current.pause();
          setIsPaused(true);
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
      setShowPauseBtn(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
      setShowPauseBtn(true);
    }
  };

  return (
    <div className="reel">
      <video
        ref={videoRef}
        src={videoURL}
        className="reelVideo"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      {/* Mute Button */}
      <button onClick={toggleMute} className="muteBtn">
        {isMuted ? <CiVolumeMute size={25} /> : <CiVolumeHigh size={25} />}
      </button>

      {/* Center Pause Icon */}
      {showPauseBtn && (
        <div className="centerPlayBtn" onClick={togglePlay}>
          <CiPlay1 />
        </div>
      )}

      <div className="reelOverlay">
        <div className="post-header">
          <img
            src= {profile || " https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"}
            alt="Default Avatar"
            className="story-profile"
            style={{ width: "40px" }}
          />
          <div className="post-header-details">
            <div className="post-header-details-left">
              <p className="post-u-name">{userName}</p>
              <p className="post-location">{location}</p>
            </div>
            <div className="post-header-details-right">
              <p className="post-time"> • 3d</p>
            </div>
          </div>
        </div>

        <div className="post-content">
          <div className="post-caption">
            <p className="post-caption">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
