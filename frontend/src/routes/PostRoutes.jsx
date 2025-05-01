import CreatePost from "../components/Post/CreatePost";
import CreateVideo from "../components/Post/CreateVideo";
import UpdatePost from "../components/Post/UpdatePost";
import ViewPost from "../components/Post/ViewPost";

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
    }
];

export default PostRoutes;