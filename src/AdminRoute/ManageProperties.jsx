import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import { SiVerizon } from "react-icons/si";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageProperties = () => {
    const axiosSecure = UseAxios()
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/pendingProperty')
            return data
        }
    })
    console.log(properties)
   
    
    const handleVerify = async (id) => {

        try {
            await axiosSecure.patch(`/pendingProperty/${id}`)
            refetch()
            const{data} = await axiosSecure.get(`/pendingProperty/${id}`)
            await axiosSecure.post('/verifyProperty',data)
            Swal.fire({
                title: "Verified Property Added Successfully!",
                icon: "success",
                draggable: true
            });


        } catch (error) {

        }
    }

    const handleDelete = async (id) => {
        try {
            await axiosSecure.patch(`/rejectProperty/${id}`)
            Swal.fire({
                title: "Rejected This Property!",
                icon: "error",
                draggable: true
            });
            refetch()
        } catch (error) {

        }

    }

    return (
        <div>

            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
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
                            properties.map(property =>
                                <tr className="bg-base-200" key={property._id}>
                                    <th className="text-sm font-bold text-gray-600">{property.bayerName}</th>
                                    <td className="text-sm font-bold text-gray-600">{property.bayerEmail}</td>
                                    <td className="text-sm font-bold text-gray-600">{property.title}</td>
                                    <td className="text-sm font-bold text-gray-600">{property.location}</td>
                                    <td className="text-sm font-bold text-gray-600">{property.minPrice}$ - {property.maxPrice}$</td>
                                    <td>
                                        {
                                            property.status === 'pending' &&
                                            <span>
                                                <button onClick={() => handleDelete(property._id)} className="sm:p-2 p-1 text-white m-1 bg-red-600 rounded-full"><FaDeleteLeft /></button>
                                                <button onClick={() => handleVerify(property._id)} className="sm:p-2 p-1 text-white m-1 bg-green-600 rounded-full "><SiVerizon /></button>
                                            </span>

                                        }
                                        {
                                            property.status === 'verified' &&
                                            <span className="text-green-500">
                                                Verified
                                            </span>

                                        }
                                        {
                                            property.status === 'rejected' &&
                                            <span className="text-red-700">
                                                Rejected
                                            </span>

                                        }
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;