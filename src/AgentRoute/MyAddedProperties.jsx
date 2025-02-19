import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import Loading from "../Page/Loading";
import { Link } from "react-router-dom";
import UseRole from "../Utility/UseRole";


const MyAddedProperties = () => {
    const axiosSecure = UseAxios()
    const [dataName] = UseRole()
    const { user } = useContext(AuthContext)
    const { data: allAdd = [], isLoading,refetch } = useQuery({
        queryKey: ['allAdd', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pendingProperty/pen/${user?.email}`)
            return data
        }
    })
    

    const handleDelete= async (id) => {
      try{
        await axiosSecure.delete(`/pendingProperty/${id}`)
      }catch(error){

      }finally{
        refetch()
      }
    }

    if (isLoading) return <Loading></Loading>

    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-blue-500">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Agent Img</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th> Price/Value </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allAdd.map(info =>
                                <tr className="bg-base-200" key={info._id}>
                                    <img className="w-16 h-16 object-cover  rounded-lg m-1" src={info.Image} alt="" />
                                    <th className="text-sm font-bold text-gray-600">{info.bayerName}</th>
                                    <th><img className="w-9 h-9 object-cover rounded-full" src={info.bayerImg} alt="" /></th>
                                    <td className="text-sm font-bold text-gray-600">{info.bayerEmail}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.title}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.location}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.minPrice}$ - {info.maxPrice}$</td>
                                    <td>
                                        {
                                            info.status === 'pending' &&
                                            <span className="text-blue-700">
                                                pending
                                            </span>

                                        }
                                        {
                                            info.status === 'verified' &&
                                            <span className="text-white sm:font-bold bg-green-600 px-1 py-1 sm:px-2 rounded-full">                                               
                                                    <Link to={`/dashboard/myAddProperties/${info._id}`}>Update</Link>
                                            </span>

                                        }
                                        {
                                            info.status === 'rejected' &&
                                            <span className="text-red-700">
                                                Rejected
                                            </span>

                                        }
                                    </td>
                                    <td>
                                        <p>
                                            <button
                                                onClick={() => handleDelete(info._id)} 
                                                className="text-white sm:font-bold bg-red-700  px-1 py-1 sm:px-2  rounded-full">
                                                Delete
                                            </button>
                                        </p>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAddedProperties;