import Video from "../Video/Video";
import { videoData } from "../../data/videoData.jsx";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function VideoList() {

  const [posts, setPosts] = useState([]);
      const navigate = useNavigate();
  
      useEffect(() => {
          const fetchPosts = async () => {
              try {
                  const response = await axios.get('http://localhost:8080/posts');
                  setPosts(response.data);
              } catch (err) {
                  console.error("Error fetching posts:", err);
              }
          };
  
          fetchPosts();
      }, []);
  
  
      const filteredPosts = posts
          .filter(post => post.type === "vid")
          .reverse(); // Reversing after filtering

    return(
        <div className="reelList">
        {filteredPosts.map((video) => (
          <Video key={video.postId} profile={video.userProfileImage} videoURL={video.contentUrl} location={video.location} userName={video.userName} caption={video.caption}/>
        ))}
      </div>
    );
}

export default VideoList;