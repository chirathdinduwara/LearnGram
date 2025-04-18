import { useState, useEffect } from "react";
import { CgHome, CgSearch, CgNotes, CgMathPlus } from "react-icons/cg";



function NavBar() {
    const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

    const toggleCreateDropdown = () => {
        setIsCreateDropdownOpen((prev) => !prev);
    };

    const handleOutsideClick = (e) => {
        if (!e.target.closest(".create-container")) {
            setIsCreateDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return <>
        <nav className="main-nav">
            <h1 className="logo">LearnGram</h1>
            <ul className="nav-items">

                <li className="nav-item"><CgHome size={25} /> Home</li>
                <li className="nav-item"><CgSearch size={25} />Search</li>
                <li className="nav-item"><CgNotes size={25} />Courses</li>
                <li className="nav-item create-container" onClick={toggleCreateDropdown} style={{ position: "relative", cursor: "pointer" }}>
                    <CgMathPlus size={25} /> Create
                    {isCreateDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li>Create Course</li>
                            <li>Create Post</li>
                            <li>Upload Video</li>
                        </ul>
                    )}
                </li>
                <li className="nav-item">
                <img
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                    alt="Default Avatar"
                    style={{ width: "30px", height: "30px", borderRadius: "100px" }}
                    />

                    Profile
                </li>
                
            </ul>

            <div className="nav-actions">
                <button className="log-out">Log Out</button>
                <button className="log-in">Log In</button>
            </div>
        </nav>
    </>
}

export default NavBar;