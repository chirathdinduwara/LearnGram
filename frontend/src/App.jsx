import { Outlet } from "react-router-dom";
import NavBar from "./components/Home/NavBar";

function App() {
  return (
    <div className="layout">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
