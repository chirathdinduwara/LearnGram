import CreatePost from "../components/Post/CreatePost";
import CreateVideo from "../components/Post/CreateVideo";
import NotificationPage from "../components/Post/Notifications";
import UpdatePost from "../components/Post/UpdatePost";
import UpdateVideo from "../components/Post/UpdateVideo";
import ViewPost from "../components/Post/ViewPost";
import ViewVideo from "../components/Post/ViewVideo";

const PostRoutes = [
    {
        path: "createPost",
        element: <CreatePost />
    },
    {
        path: "viewPost/:id",
        element: <ViewPost />
    },
    {
        path: "editPost/:id",
        element: <UpdatePost />
    },
    {
        path: "createVideo",
        element: <CreateVideo />
    },
    {
        path: 'viewVideo/:id',
        element: <ViewVideo />
    },
    {
        path: "editVideo/:id",
        element: <UpdateVideo />
    },
    {
        path: 'notification',
        element: <NotificationPage />
    }
];

export default PostRoutes;