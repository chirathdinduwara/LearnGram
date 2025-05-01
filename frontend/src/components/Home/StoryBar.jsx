import { useRef, useState } from "react";
import StoryIcon from "../Story/StoryIcon";
import StoryViewer from "../../components/Story/StoryViewer";
import StoryUploader from "../../components/Story/StoryUploader";
import StoryAddIcon from "../../components/Story/StoryAddIcon";

function StoryBar() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed factor
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="story-bar">
      <div
        className={`horizontal-story-bar ${isDragging ? "dragging" : ""}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <StoryAddIcon />
        <StoryViewer />
        {/* {[...Array(16)].map((_, index) => (
          <StoryIcon key={index} />
        ))} */}
      </div>
    </div>
  );
}

export default StoryBar;
