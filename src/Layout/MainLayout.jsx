import { Outlet } from "react-router-dom";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";
import Home from "../Page/Home";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";


const MainLayout = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = [], refetch } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/mode/Change/${user?.email}`)
            return data
        }
    })
    return (
        <div className={infos.mode === 'dark'?'bg-black text-white ':'' || infos.mode === 'light'?'':''}>
            <div>
                <Navbar></Navbar>
            </div>
            <div >
                <Outlet></Outlet>
            </div>
            <div >
                <Footer></Footer>
            </div>

        </div>
    );
};

export default MainLayout;