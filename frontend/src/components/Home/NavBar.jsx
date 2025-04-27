import { useState, useEffect } from "react";
import {
  CgHome,
  CgSearch,
  CgNotes,
  CgMathPlus,
  CgImage,
  CgCamera,
  CgFileDocument,
} from "react-icons/cg";
import { Link } from "react-router-dom";

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

  return (
    <>
      <nav className="main-nav">
        <h1 className="logo">LearnGram</h1>
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="nav-item" to="/">
              <CgHome size={25} />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/">
              <CgSearch size={25} />
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/reel">
              <CgCamera size={25} />
              Videos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/Course-Dashboard">
              <CgNotes size={25} />
              Courses
            </Link>
          </li>
          <li
            className="nav-item create-container"
            onClick={toggleCreateDropdown}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <CgMathPlus size={25} /> Create
            {isCreateDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link className="nav-item" to="/courses/create">
                    {" "}
                    Create Course <CgFileDocument size={20} />{" "}
                  </Link>{" "}
                </li>
                <li className="nav-item">
                  <Link className="nav-item" to="/gg">
                    {" "}
                    Create Post <CgImage size={20} />{" "}
                  </Link>{" "}
                </li>
                <li className="nav-item">
                  <Link className="nav-item" to="/">
                    {" "}
                    Upload Video <CgCamera size={20} />{" "}
                  </Link>{" "}
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/">
              <img
                src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                alt="Default Avatar"
                style={{ width: "30px", height: "30px", borderRadius: "100px" }}
              />
              Profile
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="log-out">Log Out</button>
          <button className="log-in">Log In</button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
