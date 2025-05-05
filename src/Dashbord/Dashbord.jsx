import { NavLink, Outlet } from "react-router-dom";
import UseRole from "../Utility/UseRole";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";


 

const Dashbord = () => {
    const [dataName] = UseRole()
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
        <div className={infos.mode === 'dark'?'bg-black text-white px-4 sm:px-10':'px-4 sm:px-10' || infos.mode === 'light'?'px-4 sm:px-10':''}>

            <div className="flex ">

                <div className={infos.mode === 'dark'?'w-4/12 sm:w-3/12   sm:pl-4 sm:pr-4 lg:pl-6 lg:pr-6 py-4 min-h-screen text-center bg-black text-white':'w-4/12 sm:w-3/12   sm:pl-4 sm:pr-4 lg:pl-6 lg:pr-6 py-4 min-h-screen text-center bg-gray-200'}>
                    {
                        dataName === 'user' &&
                        <div className={infos.mode === 'dark'?'bg-black text-white flex flex-col':'flex flex-col'} >
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black ' to='/dashboard/wishlist'>
                                Wishlist
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black ' to='/dashboard/propertyBought'>
                                Property Bought
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black ' to='/dashboard/myReview'>
                                My Reviews
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black ' to='/dashboard/userProfile'>
                                My Profile
                            </NavLink>
                        </div>
                    }


                    {
                        dataName === 'agent' &&
                        <div  className={infos.mode === 'dark'?'bg-black text-white flex flex-col':'flex flex-col'}>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/agentProfile'>
                                Agent Profile
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/addProperty'>
                                Add Property
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/myAddProperties'>
                                My Add Properties
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/requestProperty'>
                                Request Property
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/soldProperty'>
                                Sold Property
                            </NavLink>
                        </div>

                    }
                    {
                        dataName === 'admin' &&
                        <div  className={infos.mode === 'dark'?'bg-black text-white flex flex-col':'flex flex-col'}>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/adminProfile'>
                                Admin Profile
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/manageUser'>
                                Manage User
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/manageProperties'>
                                Manage Properties
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/manageReview'>
                                Manage Review
                            </NavLink>
                            <NavLink className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm font-semibold sm:font-bold text-gray-300  hover:text-black' to='/dashboard/advertise'>
                                Advertise Property
                            </NavLink>
                        </div>
                    }
                    <hr className="my-4 h-1 bg-gray-600" />

                    <div className="flex flex-col">
                        <NavLink to='/' className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black '>Home</NavLink>
                        <NavLink to='/allProperties' className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black '> All properties</NavLink>
                        <NavLink to='/allReview' className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black '>Reviews</NavLink>
                        <NavLink to='/allAdvertise' className='bg-yellow-800 rounded-2xl m-2 py-3 text-sm  md:font-semibold lg:font-bold text-gray-300  hover:text-black '>Advertisement</NavLink>

                    </div>

                </div>
                <div className={infos.mode === 'dark'?'bg-black text-white w-8/12 sm:w-9/12 ml-4 pt-3':'w-8/12 sm:w-9/12 ml-4 pt-3'}>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default Dashbord;