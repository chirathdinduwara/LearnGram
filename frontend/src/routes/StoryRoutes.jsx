import React from "react";
import StoryViewer from "../components/Story/StoryViewer";
import StoryUploader from "../components/Story/StoryUploader";

const StoryRoutes = [
  {
    path: "/createStory",
    element: <StoryUploader />,
  },
  {
    path: "/story/:storyId",
    element: <StoryViewer />,
  },
  {
    path: "/edit/:storyId",
    element: <StoryUploader />,
  },
];

export default StoryRoutes;
