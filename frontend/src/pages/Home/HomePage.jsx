import NavBar from "../../components/Home/NavBar";
import StoryBar from "../../components/Home/StoryBar";

import '../../css/Home/HomePage.css';


function HomePage() {
    return(
        <>
            <div className="home-container">
                <NavBar />
                <div className="home-contents">
                    <StoryBar />
                </div>
            </div>
        </>
    );
}

export default HomePage;