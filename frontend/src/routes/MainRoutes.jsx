import App from "../App";
import HomeRoutes from "./HomeRoutes";
import CourseRoutes from "./CourseRoutes";

const router = [
  {
    path: "/",
    element: <App />,
    children: [...HomeRoutes, ...CourseRoutes],
  },
];

export default router;
