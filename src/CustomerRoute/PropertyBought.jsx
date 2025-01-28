import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Page/Loading";


const PropertyBought = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = [],refetch, isPending } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offered/${user?.email}`)
            return data
        }
    })

    if (isPending) return <Loading></Loading>
    console.log(infos)

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do You Want To Delete It!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/rejectedProperty/delete/${id}`)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch()
            }
          });
    
    }
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Agent Name</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Offer Price</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {Array.isArray(infos) &&
                            infos.map(info =>
                                <tr className="bg-base-200" key={info._id}>
                                    <img className="w-16 rounded-lg m-1" src={info.Image} alt="" />
                                    <th>{info.agentName}</th>
                                    <td className="text-sm font-bold text-gray-600">{info.title}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.location}</td>
                                    <td className="text-sm font-bold text-gray-600">{info.offeredPrice}$</td>
                                    <td className="text-sm font-bold text-gray-600">{info.status}</td>
                                    <td>
                                        {
                                            info.status === 'accepted' &&
                                            <span>
                                                <button className="sm:px-5 sm:py-2 px-1 py-1 text-white m-1 bg-blue-600 rounded-lg">
                                                    <Link to={`/dashboard/propertyBought/${info._id}`} className="text-sm font-bold text-white">Pay</Link>
                                                </button>
                                            </span>
                                        }
                                    </td>
                                    <td>
                                        {
                                            info.status === 'rejected' &&
                                            <span>
                                                <button
                                                    onClick={() => handleDelete(info._id)}
                                                    className="sm:px-5 font-bold sm:py-2 px-1 py-1 text-white m-1 bg-red-600 rounded-lg">
                                                  <Link>Delete</Link>
                                                </button>
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

export default PropertyBought;

