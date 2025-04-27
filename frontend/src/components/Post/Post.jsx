function Post({img, profile, caption, location, name}) {


    return (
        <>
            <div className="post">
                <div className="post-header">
                <img
                    src={"https://lh3.googleusercontent.com/a/ACg8ocIbM8HuQ6RN5UdaNpWw1wLtBSqZPhFl7oTsVPNmvAY5VFlUxH7C=s96-c"}
                    alt="Default Avatar"
                    className="story-profile"
                    style={{width: "40px", }}
                />
                <div className="post-header-details">
                    <div className="post-header-details-left">
                        <p className="post-u-name">{name}</p>
                        <p className="post-location">{location}</p>
                    </div>
                    <div className="post-header-details-right">
                        <p className="post-time"> • 3d</p>
                    </div>
                </div>
                </div>
                <div className="post-content">
                    <img className="post-img" src={img} alt="" srcset="" />
                    <div className="post-caption">
                        <p className="post-u-name">{name}</p>
                        <p>{caption}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;