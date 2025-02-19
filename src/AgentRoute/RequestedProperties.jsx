import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../Page/Loading";



const RequestedProperties = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: dataAll = [], refetch, isPending } = useQuery({
        queryKey: ['dataAll', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/requested/offer/agent/${user?.email}`)
            return data
        }
    })
    if (isPending) return <Loading></Loading>
   
    const handleReject = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Do You Want To Rejected It!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.patch(`rejected/${id}`)
                    Swal.fire({
                        title: "Rejected!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            });

        } catch (error) {

        }
    }

    const handleAccept =async (id) => {
        try {
            await axiosSecure.patch(`accepted/${id}`)
            
                    Swal.fire({
                        title: "Accepted Offer Successfully!",
                        icon: "success",
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

                    <thead>
                        <tr  className="text-blue-500">

                            <th>Bayer Name</th>
                            <th>Bayer Email</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Offer Price</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {Array.isArray(dataAll) &&
                            dataAll.map(info =>
                                <tr className="bg-base-200" key={info._id}>
                                    <th className="text-sm font-bold text-gray-600">{info.bayerName}</th>
                                    <th className="text-sm font-bold text-gray-600">{info.bayerEmail}</th>
                                    <td className="text-sm font-bold text-gray-600">{info.title}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.location}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.offeredPrice}$</td>
                                    <td>

                                        {
                                            info.status === 'accepted' &&
                                            <span className="text-sm font-bold text-green-600">Accepted</span>

                                        }
                                        {
                                            info.status === 'pending' &&
                                            <span>
                                                <button 
                                                onClick={() => handleAccept(info._id)}
                                                className="sm:p-2 p-1 text-white m-1 bg-green-600 rounded-full">
                                                    Accept
                                                </button>
                                            </span>

                                        }

                                    </td>
                                    <td>

                                        {
                                            info.status === 'pending' &&
                                            <span>
                                                <button
                                                    onClick={() => handleReject(info._id)}
                                                    className="sm:p-2 p-1 text-white m-1 bg-red-600 rounded-full">
                                                    Reject
                                                </button>
                                            </span>

                                        }
                                        {
                                            info.status === 'rejected' &&
                                            <span className="text-sm font-bold text-red-600">Rejected</span>

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

export default RequestedProperties;