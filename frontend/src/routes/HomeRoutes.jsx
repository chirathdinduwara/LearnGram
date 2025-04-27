import VideoList from "../components/Home/VideoList";
import HomePage from "../pages/Home/HomePage";


const HomeRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: "reel",
    element: <VideoList />
  }
];

export default HomeRoutes;
