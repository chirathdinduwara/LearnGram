import ProfPosts from "../components/Post/ProfPosts.jsx";
import Profile from "../pages/Home/Profile.jsx";

const ProfileRoutes = [
    {
        path: "profile",
        element: <Profile />,
        children: [
            {
                index: true,
                element: <ProfPosts />
            }
        ]
    }
];

export default ProfileRoutes;