import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";

const LoginRoutes = [
    {
        path: "login",
        element: <Login />
    },
    {
        path: "sign-up",
        element: <SignUp />
    }
];

export default LoginRoutes;