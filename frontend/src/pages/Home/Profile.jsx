import React from 'react';
import ProfNav from '../../components/Profile/ProfNav';
import ProfPosts from '../../components/Post/ProfPosts';
import { Outlet } from 'react-router-dom';


function Profile() {
    const prof = localStorage.getItem("userImage");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    return (
        <div className="profile">
            <div className="profile-details">
                <img
                    src={prof}
                    alt="Profile Avatar"
                    className="story-profile"
                    style={{ width: "120px" }}
                />
                <div className="user-details">
                    <h3 className="user-name">{userName}</h3>
                    <p className="user-email">{userEmail}</p>
                </div>
            </div>
            <hr style={{borderColor: "#9c9c9c" }} />
            <ProfNav />
            <Outlet />
        </div>
    );
}

export default Profile;
