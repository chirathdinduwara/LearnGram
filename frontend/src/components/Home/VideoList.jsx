import Video from "../Video/Video";
import { videoData } from "../../data/videoData.jsx";

function VideoList() {
    return(
        <div className="reelList">
        {videoData.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    );
}

export default VideoList;