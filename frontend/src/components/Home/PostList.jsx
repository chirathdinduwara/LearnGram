import Post from "../Post/Post";

function PostList() {
    return(
        <>
            <div className="postList">
                <Post img="https://images.unsplash.com/photo-1725653215892-98436bd2c430?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Post img="https://live.staticflickr.com/4017/4522873069_4046ae1b6c_z.jpg"/>
                <Post img="https://upload.wikimedia.org/wikipedia/en/1/14/Balltze_%28Cheems%29.jpg"/>
            </div>
        </>
    );
}

export default PostList;