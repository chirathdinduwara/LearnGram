import ProfPosts from "../components/Post/ProfPosts.jsx";
import ProfVideos from "../components/Post/ProfVideos.jsx";
import Profile from "../pages/Home/Profile.jsx";

const ProfileRoutes = [
    {
        path: "profile",
        element: <Profile />,
        children: [
            {
                index: true,
                element: <ProfPosts />
            },
            {
                path: 'videos',
                element: <ProfVideos />
            }
        ]
    }
];

export default ProfileRoutes;