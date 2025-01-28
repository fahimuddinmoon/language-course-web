import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import UseRole from "../Utility/UseRole";


const Wishlist = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: allData = [], refetch } = useQuery({
        queryKey: ['allData', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user?.email}`)
            return data
        }
    })

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/wishlist/${id}`)
        } catch (error) {

        } finally {
            refetch()
        }
    }
    return (
        <div>
            {
                allData.length > 0 ?
                    <div className="overflow-x-auto ">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Agent Image</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th> Price/Value </th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {Array.isArray(allData) &&
                                    allData.map(data =>
                                        <tr className="bg-base-200" key={data._id}>
                                            <img className="w-16 rounded-lg m-1" src={data.Image} alt="" />
                                            <th className="text-sm font-bold text-gray-600">{data.bayerName}</th>
                                            <th><img className="w-9 rounded-full" src={data.bayerImg} alt="" /></th>

                                            <td className="text-sm font-bold text-gray-600">{data.title}</td>
                                            <td className="text-sm font-bold text-gray-600">{data.location}</td>
                                            <td className="text-sm font-bold text-gray-600">{data.minPrice}$ - {data.maxPrice}$</td>
                                            <td className="text-sm font-bold text-gray-600">{data.status}</td>
                                            <td>
                                                <button className="text-white sm:font-bold bg-blue-700  px-1 py-1 sm:px-2  rounded-full">
                                                    <Link to={`/dashboard/offer/${data._id}`}>Make an offer</Link>
                                                </button>
                                            </td>
                                            <td><button
                                                onClick={() => handleDelete(data._id)}
                                                className="text-white sm:font-bold bg-red-700  px-1 py-1 sm:px-2  rounded-full">
                                                Remove
                                            </button>
                                            </td>
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </div> :
                
                        <h3 className="text-4xl font-bold  text-center  text-black">No Data Found</h3>
                    
           }

        </div>
    );
};

export default Wishlist;