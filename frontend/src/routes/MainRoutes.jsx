
import App from "../App"
import HomeRoutes from "./HomeRoutes"

const router = [
    {
        path: '/',
        element: <App />,
        children: [
            ...HomeRoutes
        ]
    }
]

export default router;