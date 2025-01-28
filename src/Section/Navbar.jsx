import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Utility/AuthProvider";

const Navbar = () => {
    const { user,logout } = useContext(AuthContext)
  
    
    return (
        <div className="navbar bg-yellow-800 text-white  z-50 fixed ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <NavLink to='/' className='text-sm font-bold '>Home</NavLink>
                        <NavLink to='/allProperties' className='text-sm font-bold '> All properties</NavLink>
                        <NavLink to='/dashboard' className='text-sm font-bold '>Dashboard</NavLink>

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-lg font-bold p-0 m-0 sm:text-4xl sm:font-extrabold"> Real Estate Platform </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 mt-3">
                    <NavLink to='/' className='text-sm  font-bold  px-4 py-4'>Home</NavLink>
                    <NavLink to='/allProperties' className='text-sm  font-bold   px-4 py-4'> All properties</NavLink>
                    <NavLink to='/dashboard' className='text-sm  font-bold   px-4 py-4'>Dashboard</NavLink>

                </ul>
            </div>
            <div className="navbar-end mt-3">
            

                {
                    user ?
                        <span className='flex justify-center items-center'>
                            
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                           referrerPolicy="noreferrer"
                                            title={user?.displayName}
                                            alt=""
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                
                            
                            <Link onClick={logout} className="btn mx-3 text-sm font-bold text-gray-600">log Out</Link>
                        </span>
                        :
                        <Link to='/login' className="btn mx-3 text-sm font-bold text-gray-600">login</Link>
                }




            </div>
        </div>
    );
};

export default Navbar;