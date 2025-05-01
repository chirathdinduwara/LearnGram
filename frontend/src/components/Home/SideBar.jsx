

function SideBar() {

    const profile = localStorage.getItem("userImage");
    const name = localStorage.getItem("userName");


    return(
        <>
           <div className="side-bar">
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
    
                    </div>
                    {/* <div className="post-header-details-right">
                        <p className="post-time"> • 3d</p>
                    </div> */}
                </div>
                </div>
            </div> 
        </>
    );
}

export default SideBar;