
import App from "../App"
import HomeRoutes from "./HomeRoutes"
import LoginRoutes from "./LoginRoutes";

const router = [
    {
        path: '/',
        element: <App />,
        children: [
            ...HomeRoutes
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