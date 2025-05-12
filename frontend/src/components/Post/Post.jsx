import { useNavigate } from "react-router-dom";

function Post({ id, img, profile, caption, location, name, userId, onClick }) {
    const navigate = useNavigate();

    function handlePostClick(postId) {
        navigate(`viewPost/${postId}`);
    }

    function handleUserClick(userId) {
        navigate(`/viewProfile/${userId}`); // route to that user's profile
    }

    return (
        <>
            <div className="post">
                <div className="post-header">
                    <img
                        src={profile}
                        alt="Default Avatar"
                        className="story-profile"
                        style={{ width: "40px" }}
                        onClick={() => handleUserClick(userId)}
                    />
                    <div className="post-header-details">
                        <div className="post-header-details-left">
                            <p className="post-u-name" onClick={() => handleUserClick(userId)} style={{ cursor: "pointer" }}>
                                {name}
                            </p>
                            <p className="post-location">{location}</p>
                        </div>
                    </div>
                </div>
                <div className="post-content">
                    <img className="post-img" src={img} onClick={onClick} alt="Post" />
                    <div className="post-caption">
                        <p className="post-u-name" onClick={() => handleUserClick(userId)} style={{ cursor: "pointer" }}>
                            {name}
                        </p>
                        <p>{caption}</p>
                    </div>
                </div>
                <div className="post-comment">
                    <p onClick={() => handlePostClick(id)} className="view-comment">View All Comments</p>
                    <p onClick={() => handlePostClick(id)} className="view-comment">Add a Comment...</p>
                </div>
            </div>
        </>
    );
}

export default Post;
