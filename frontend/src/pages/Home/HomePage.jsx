import NavBar from "../../components/Home/NavBar";
import PostList from "../../components/Home/PostList";
import StoryBar from "../../components/Home/StoryBar";

import '../../css/Home/HomePage.css';


function HomePage() {
    return(
        <>
            <div className="home-container">
                <NavBar />
                <div className="home-contents">
                    <StoryBar />
                    <PostList />
                </div>
            </div>
        </>
    );
}

export default HomePage;