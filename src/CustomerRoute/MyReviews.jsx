import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import SingleReview from "../Section/SingleReview";


const MyReviews = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: info = [], isLoading,refetch } = useQuery({
        queryKey: ['info', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/review/${user?.email}`)
            return data
        }
    })
    console.log(info)
    return (
        <div className="">
            <h2  className='text-3xl font-bold my-7 text-center'>My Reviews</h2>
            <div className="lg:grid lg:grid-cols-3 gap-6 sm:m-7">
                {
                    info.map(data => <SingleReview key={data._id} data={data}></SingleReview>)
                }
            </div>

        </div>
    );
};

export default MyReviews;