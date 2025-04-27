import App from "../App"
import CourseRoutes from "./CourseRoutes";
import HomeRoutes from "./HomeRoutes"
import LoginRoutes from "./LoginRoutes";
import PostRoutes from "./PostRoutes";
import ProfileRoutes from "./ProfileRoutes";


const router = [
    {
        path: '/',
        element: <App />,
        children: [
            ...HomeRoutes,
            ...CourseRoutes,
            ...PostRoutes,
            ...ProfileRoutes
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
