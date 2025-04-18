import { CgHome, CgSearch, CgNotes, CgMathPlus } from "react-icons/cg";

function NavBar() {
  return (
    <>
      <nav className="main-nav">
        <h1 className="logo">LearnGram</h1>
        <ul className="nav-items">
          <li className="nav-item">
            <CgHome size={25} /> Home
          </li>
          <li className="nav-item">
            <CgSearch size={25} />
            Search
          </li>
          <li className="nav-item">
            <CgNotes size={25} />
            Courses
          </li>
          <li className="nav-item">
            <CgMathPlus size={25} />
            Create
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
  );
}

export default NavBar;
