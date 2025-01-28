import { Navigate, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Section/Navbar"; 
import UseRole from "../Utility/UseRole";
import Loading from "../Page/Loading";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import Footer from "../Section/Footer";



const Dashbord = () => {
    const [dataName] = UseRole()


    
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex pt-16 sm:h-s lg:pt-24 ">
                <div className="w-3/12 sm:w-3/12   sm:pl-10 sm:pr-10 bg-black py-4 min-h-screen">

                    {
                         dataName === 'user' &&
                            <div className="flex flex-col ">
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/wishlist'>
                                    Wishlist
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/propertyBought'>
                                    Property Bought
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/myReview'>
                                    My Reviews
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/userProfile'>
                                    My Profile
                                </NavLink>
                            </div> 
                    }


                    {
                         dataName === 'agent' &&
                            <div className="flex flex-col">
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/agentProfile'>
                                    Agent Profile
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/addProperty'>
                                    Add Property
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/myAddProperties'>
                                    My Add Properties
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/requestProperty'>
                                    Request Property
                                </NavLink>
                                <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/soldProperty'>
                                    Sold Property
                                </NavLink>
                            </div>

                    }
                    {
                          dataName === 'admin' &&
                        <div className="flex flex-col">
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/adminProfile'>
                                Admin Profile
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/manageUser'>
                                Manage User
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/manageProperties'>
                                Manage Properties
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/manageReview'>
                                Manage Review
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300 pl-1 sm:pl-5' to='/dashboard/advertise'>
                                Advertise Property
                            </NavLink>
                        </div>
                    }

                    

                </div>
                <div className=" w-9/12 p-4 bg-slate-50 text-black">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashbord;