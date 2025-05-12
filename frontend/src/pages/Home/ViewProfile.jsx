import React, { useEffect, useState } from 'react';
import ProfNav from '../../components/Profile/ProfNav';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewProfile() {
    const { userId } = useParams(); 
    const loggedInEmail = localStorage.getItem("userEmail");

    const [viewedUser, setViewedUser] = useState(null); // user being viewed
    const [currentUser, setCurrentUser] = useState(null); // logged-in user
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/users/');
                const current = res.data.find(u => u.email === loggedInEmail);
                const viewed = res.data.find(u => u.email === userId);

                setCurrentUser(current);
                setViewedUser(viewed);

                if (current && viewed) {
                    setFollowed(viewed.followers?.includes(current.id));
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };

        fetchUsers();
    }, [userId, loggedInEmail]);

    const handleFollowToggle = async () => {
        if (!currentUser || !viewedUser) return;

        try {
            if (followed) {
                await axios.put(`http://localhost:8080/api/users/${viewedUser.id}/unfollow/${currentUser.id}`);
                setFollowed(false);
            } else {
                await axios.put(`http://localhost:8080/api/users/${viewedUser.id}/follow/${currentUser.id}`);
                setFollowed(true);
            }
        } catch (err) {
            console.error("Follow/Unfollow failed", err);
        }
    };

    if (!viewedUser) return <p>Loading profile...</p>;

    return (
        <div className="profile">
            <div className="profile-details">
    <img
        src={viewedUser.profilePicture}
        alt="Profile Avatar"
        className="story-profile"
    />
    <div className="user-details">
        <h3 className="user-name">{viewedUser.name}</h3>
        <p className="user-email">{viewedUser.email}</p>
        {loggedInEmail !== viewedUser.email && (
            <button onClick={handleFollowToggle} className="follow-btn">
                {followed ? 'Unfollow' : 'Follow'}
            </button>
        )}
    </div>
</div>

            <hr style={{ borderColor: "#9c9c9c" }} />
            <ProfNav />
            <Outlet />
        </div>
    );
}

export default ViewProfile;
