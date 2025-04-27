import App from "../App"
import CourseRoutes from "./CourseRoutes";
import HomeRoutes from "./HomeRoutes"
import LoginRoutes from "./LoginRoutes";
import PostRoutes from "./PostRoutes";


const router = [
    {
        path: '/',
        element: <App />,
        children: [
            ...HomeRoutes,
            ...CourseRoutes,
            ...PostRoutes
        ]
    },
    {
        path: '/',
        children: [
            ...LoginRoutes,
        ]
    }
]

export default router;
