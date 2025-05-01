import { useNavigate } from "react-router-dom";


function Post({id, img, profile, caption, location, name, onClick}) {

    const navigate = useNavigate();

    function handlenNav(id) {
        navigate(`viewPost/${id}`)
    }
    

    return (
        <>
            <div className="post">
                <div className="post-header">
                <img
                    src={profile}
                    alt="Default Avatar"
                    className="story-profile"
                    style={{width: "40px", }}
                />
                <div className="post-header-details">
                    <div className="post-header-details-left">
                        <p className="post-u-name">{name}</p>
                        <p className="post-location">{location}</p>
                    </div>
                    {/* <div className="post-header-details-right">
                        <p className="post-time"> • 3d</p>
                    </div> */}
                </div>
                </div>
                <div className="post-content">
                    <img className="post-img" src={img} onClick={onClick}  alt="" srcset="" />
                    <div className="post-caption">
                        <p className="post-u-name">{name}</p>
                        <p>{caption}</p>
                    </div>
                </div>
                <div className="post-comment">
                    <p onClick={() => handlenNav(id)} className="view-comment">View All Comments</p>
                    <p onClick={() => handlenNav(id)} className="view-comment">Add a Comment...</p>
                </div>
      </div>
    </>
  )};

export default Post;
