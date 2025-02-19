import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import Swal from "sweetalert2";


const ManageReviews = () => {
    const axiosSecure = UseAxios()
    const { data: allData = [], refetch } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/reviews')
            return data
        }
    })

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Do You Want To Delete It ??",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.delete(`/review/delete/${id}`)
                    Swal.fire({
                        title: "Deleted SuccessFully!",
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
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-blue-500">
                            <th>ReviewerImage</th>
                            <th>ReviewerName</th>
                            <th>ReviewerEmail</th>
                            <th>Review</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allData.map(data =>
                                <tr className="bg-base-200" key={data._id}>
                                    <img className="w-16 h-16 object-cover rounded-full m-1" src={data.reviewerImg} alt="" />
                                    <th className="text-sm font-bold text-gray-600">{data.reviewerName}</th>
                                    <td className="text-sm font-bold text-gray-600">{data.reviewerEmail}</td>
                                    <td title={data.review} className="text-sm font-bold text-gray-600">{(data.review).slice(0, 20)}..</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(data._id)}
                                            className="text-white sm:font-bold bg-red-700  px-1 py-1 sm:px-2  rounded-full">
                                            Delete
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

export default ManageReviews;