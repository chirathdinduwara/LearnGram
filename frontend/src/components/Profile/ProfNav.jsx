import { Link } from "react-router-dom";
import { CgMenuGridR, CgFilm  } from "react-icons/cg";
function ProfNav() {
    return(
        <>
            <nav className="prof-nav">
                <ul className="prof-nav-list">
                    <li className="prof-nav-item">
                        <Link className="prof-nav-item">
                            <CgMenuGridR /> Post
                        </Link>
                    </li>
                    <li className="prof-nav-item">
                        <Link className="prof-nav-item">
                            <CgFilm /> Video
                        </Link>    
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default ProfNav;