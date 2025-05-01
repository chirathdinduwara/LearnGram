
import PostList from "../../components/Home/PostList";
import SideBar from "../../components/Home/SideBar";
import StoryBar from "../../components/Home/StoryBar";

import "../../css/Home/HomePage.css";



function HomePage() {
    return(
        <>
            <div className="home-container">
            <StoryBar />
                <div className="home-contents">
                   
                 
                    <PostList className="home-content-right" />
                </div>
            </div>
        </>
    );
}

export default HomePage;
