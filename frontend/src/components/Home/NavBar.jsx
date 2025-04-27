import axios from "axios";
import { useState, useEffect } from "react";
import { CgHome, CgSearch, CgNotes, CgMathPlus, CgImage, CgCamera, CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";


function NavBar() {
    const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

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

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setIsLoggedIn(!!userEmail);
    }, []);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         const fetchUserData = async () => {
    //             try {

    //                 const userEmail = localStorage.getItem('userEmail');
    //                 const response = await axios.get(`http://localhost:8080/api/users/${userEmail}`);

    //                 setUserData(response.data);

    //                 console.log("User data fetched:", response.data);
    //             } catch (error) {
    //                 console.error("Error while fetching user data:", error);
    //             }
    //         };
    
    //         fetchUserData(); 
    //     }
    // }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
    };



    return (
        <>
            <nav className="main-nav">
                <h1 className="logo">LearnGram</h1>
                <ul className="nav-items">
                    <li className="nav-item"><Link className="nav-item" to="/"><CgHome size={25} />Home</Link></li>
                    <li className="nav-item"><Link className="nav-item" to="/"><CgSearch size={25} />Search</Link></li>
                    <li className="nav-item"><Link className="nav-item" to="/reel"><CgCamera size={25} />Videos</Link></li>
                    <li className="nav-item"><Link className="nav-item" to="/Course-Dashboard"><CgNotes size={25} />Courses</Link></li>

                    <li className="nav-item create-container" onClick={toggleCreateDropdown} style={{ position: "relative", cursor: "pointer" }}>
                        <CgMathPlus size={25} /> Create
                        {isCreateDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="nav-item"><Link className="nav-item" to="/">Create Course <CgFileDocument size={20} /></Link></li>
                                <li className="nav-item"><Link className="nav-item" to="/gg">Create Post <CgImage size={20} /></Link></li>
                                <li className="nav-item"><Link className="nav-item" to="/">Upload Video <CgCamera size={20} /></Link></li>
                            </ul>
                        )}
                    </li>

                    {isLoggedIn && (
                        <li className="nav-item">
                        <Link className="nav-item" to="/profile">
                            <img
                                src={''}
                                alt="Default Avatar"
                                style={{ width: "30px", height: "30px", borderRadius: "100px" }}
                            />
                                Profile
                        </Link>
                        </li>
                    )}

                </ul>

                <div className="nav-actions">
                    {isLoggedIn ? (
                        <button className="log-out" onClick={handleLogout}>Log Out</button>
                    ) : (
                        <Link to="/login">
                            <button className="log-in">Log In</button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
