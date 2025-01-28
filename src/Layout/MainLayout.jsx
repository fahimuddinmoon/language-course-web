import { Outlet } from "react-router-dom";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";
import Home from "../Page/Home";


const MainLayout = () => {
    return (
        <div>
            <div >
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default MainLayout;