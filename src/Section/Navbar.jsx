import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Utility/AuthProvider";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
const Navbar = () => {
    const { user, logout, dark, setDark } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = [], refetch } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/mode/Change/${user.email}`)
            return data
        }
    })
    
    const handlelight = async (id) => {
    
        try {
           
                await axiosSecure.patch(`/mode/update/${id}`)
        } catch {

        } finally {
            refetch()
        }
     
        
    }

    const handledark = async (id) => {
   console.log(id)
        try {
                await axiosSecure.patch(`/mode/update/light/${id}`)
        } catch {

        } finally {
            refetch()
        }
    
        
    }


    return (
        <div className="navbar bg-yellow-800 text-white  z-50 fixed  sm:px-10">
            <div className="navbar-start ">
                <div className="dropdown p-0 m-0">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 p-0 m-0 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {
                        user ?
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-yellow-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow items-center">
                                <NavLink to='/' className='text-sm font-bold px-3'>Home {infos.length}</NavLink>
                                <NavLink to='/allProperties' className='text-sm font-bold px-3'> All properties</NavLink>
                                <NavLink to='/allReview' className='text-sm font-bold px-3'>Reviews</NavLink>
                                <NavLink to='/dashboard' className='text-sm font-bold px-3'>Dashboard</NavLink>
                                <NavLink to='/allAdvertise' className='text-sm font-bold px-3'>Advertisement</NavLink>
                            </ul> :
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-yellow-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow items-center">
                                <NavLink to='/' className='text-sm font-bold px-3'>Home</NavLink>
                                <NavLink to='/allProperties' className='text-sm font-bold px-3'> All properties</NavLink>
                                <NavLink to='/allReview' className='text-sm font-bold px-3'>Reviews</NavLink>
                            </ul>
                    }
                </div>
                <Link to='/' className="btn btn-ghost text-lg font-bold p-0 m-0 md:text-2xl lg:text-4xl sm:font-extrabold"> Real Estate Platform </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {
                    user ?
                        <ul className="menu menu-horizontal  mt-3">
                            <NavLink to='/' className='text-sm  font-bold  px-4 py-4'>Home</NavLink>
                            <NavLink to='/allProperties' className='text-sm  font-bold   px-4 py-4'> All properties</NavLink>
                            <NavLink to='/allReview' className='text-sm font-bold  px-4 py-4'>Reviews</NavLink>
                            <NavLink to='/dashboard' className='text-sm font-bold px-3 py-4'>Dashboard</NavLink>
                            <NavLink to='/allAdvertise' className='text-sm font-bold px-3 py-4'>Advertisement</NavLink>
                        </ul> :
                        <ul className="menu menu-horizontal  pt-3">
                            <NavLink to='/' className='text-sm  font-bold  px-4 py-4'>Home</NavLink>
                            <NavLink to='/allProperties' className='text-sm  font-bold   px-4 py-4'> All properties</NavLink>
                            <NavLink to='/allReview' className='text-sm font-bold  px-4 py-4'>Reviews</NavLink>
                        </ul>
                }
            </div>
            <div className="navbar-end my-3 ">


                {
                    user ?
                        <span className='flex justify-center items-center'>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 m-1 rounded-full">
                                        <img
                                            referrerPolicy="no-referrer"
                                            title={user?.displayName}
                                            alt=""
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-white text-black font-semibold rounded-box  mt-3 w-16">
                                    <li><button className="hover:bg-slate-200" onClick={()=>handledark(infos?._id)}><CiSun title="Light" /></button></li>
                                    <li><button className="hover:bg-slate-200" onClick={()=>handlelight(infos?._id)}><IoMoonOutline title="Dark" /></button></li>
                                </ul>
                            </div>


                            <Link onClick={logout} className="btn  text-sm font-bold text-gray-600">log Out</Link>
                        </span>
                        :
                        <Link to='/login' className="btn  text-sm font-bold text-gray-600">login</Link>
                }




            </div>
        </div>
    );
};

export default Navbar;