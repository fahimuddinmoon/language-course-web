import { useContext } from "react";
import AuthProvider, { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSkullCrossbones } from "react-icons/fa";
import Loading from "../Page/Loading";

const ManageUsers = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: allData = [], isLoading, refetch } = useQuery({
        queryKey: ['allData', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allUsers/${user?.email}`)
            return data
        }
    })
   

    const handleChange = async (e, id, dataRole) => {
        e.preventDefault()
        const userRole = e.target.changeRole.value
        const userData = { userRole }
       
        try {
            
            Swal.fire({
                title: "Are you sure?",
                text: "Do You Want To Change Role ??",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Change it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.patch(`/change/role/${id}`, userData)
                    Swal.fire({
                        title: "Role Update SuccessFully!",
                        icon: "success",
                        draggable: true
                    });

                }
                refetch()
            });
        } catch (error) {

        } finally {

        }

    }


    const handleFraud = async (id,dataEmail) => {
      try{
        Swal.fire({
            title: "Are you sure?",
            text: "Do You Want To Fraud Agent??",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/fraud/user/${id}`)
                await axiosSecure.delete(`/fraud/user/allData/${dataEmail}`)
                Swal.fire({
                    title: "Update SuccessFully!",
                    icon: "success",
                    draggable: true
                });

            }
            refetch()
        });
        
      }catch(error){

      }
    }

    if(isLoading) return <Loading></Loading>
    return (
        <div>
            <div className='text-center'>
                <h2 className='text-3xl font-bold my-2 pb-5'>
                    Manage All Users
                </h2>
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-blue-500">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Role Change</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                allData.map(data =>
                                    <tr className=" text-center justify-center items-center" key={data._id}>
                                        <img className="w-16 h-16  object-cover rounded-full m-1" src={data.image} alt="" />
                                        <th className="text-sm font-bold text-gray-600">{data.name}</th>
                                        <td className="text-sm font-bold text-gray-600">{data.email}</td>
                                        <td className="text-sm font-bold text-gray-600">{data.role}</td>
                                        <td>
                                            {
                                                data.report === 'well' &&
                                                <form onSubmit={(e) => handleChange(e, data._id,data.role)}>
                                                    <select defaultValue={data.role} name="changeRole" id="">
                                                        <option value="user">user</option>
                                                        <option value="agent">agent</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                    <button className=" p-1 text-white m-1 bg-green-600 rounded-full">Role Change</button>
                                                </form>
                                            }
                                        </td>
                                        <td>
                                            {
                                                data?.role === 'agent' && data?.report === 'well' &&
                                                <button
                                                    onClick={() => handleFraud(data._id,data.email)}
                                                    className="text-white sm:font-bold bg-red-700  px-1 py-1 sm:px-2  rounded-full">
                                                    Mark as fraud
                                                </button>
                                            }
                                        </td>
                                        <td>
                                            {
                                                data?.report === 'fraud' &&
                                                <span className="text-lg font-bold text-red-600">Fraud</span>
                                            }
                                        </td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;