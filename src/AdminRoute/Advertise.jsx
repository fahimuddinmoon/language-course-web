import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import { Link } from "react-router-dom";


const Advertise = () => {
    const axiosSecure = UseAxios()
    const { data: infos = [], isLoading } = useQuery({
        queryKey: ['infos'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/verifyProperty')
            return data
        }
    })
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-blue-500">
                            <th>Property Image</th>
                            <th>Agent Name</th>
                            <th>Property Title</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {Array.isArray(infos) &&
                            infos.map(data =>
                                <tr className="" key={data._id}>
                                    <img className="w-16 h-16 object-cover rounded-full m-1" src={data.Image} alt="" />
                                    <th className="text-sm font-bold text-gray-600">{data.bayerName}</th>
                                    <td className="text-sm font-bold text-gray-600">{data.title}</td>
                                    <td className="text-sm font-bold text-gray-600">{data.minPrice} - {data.maxPrice}</td>
                                    <td>
                                        <button

                                            className="text-white sm:font-bold bg-yellow-800  px-1 py-1 sm:px-2  rounded-full">
                                            <Link to={`/dashboard/advertise/${data._id}`}>Advertise</Link>
                                        </button>
                                    </td>

                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Advertise;