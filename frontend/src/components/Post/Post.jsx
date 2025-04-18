function Post({img}) {
    return (
        <>
            <div className="post">
                <div className="post-header">
                <img
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                    alt="Default Avatar"
                    className="story-profile"
                    style={{width: "40px", }}
                />
                <div className="post-header-details">
                    <div className="post-header-details-left">
                        <p className="post-u-name">_Chirath_d</p>
                        <p className="post-location">Embilipitiya</p>
                    </div>
                    <div className="post-header-details-right">
                        <p className="post-time"> • 3d</p>
                    </div>
                </div>
                </div>
                <div className="post-content">
                    <img className="post-img" src={img} alt="" srcset="" />
                    <div className="post-caption">
                        <p className="post-u-name">_Chirath_d</p>
                        <p>1st post</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;