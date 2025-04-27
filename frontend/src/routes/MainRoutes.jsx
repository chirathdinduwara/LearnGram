import App from "../App"
import CourseRoutes from "./CourseRoutes";
import HomeRoutes from "./HomeRoutes"
import LoginRoutes from "./LoginRoutes";


const router = [
    {
        path: '/',
        element: <App />,
        children: [
            ...HomeRoutes,
            ...CourseRoutes
        ]
    },
    {
        path: '/',
        children: [
            ...LoginRoutes
        ]
    }
]

export default router;
