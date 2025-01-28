import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import SingleReview from "./SingleReview";


const ReviewSection = () => {
    const axiosSecure = UseAxios()
    const { data: allData = [], refetch } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/reviews')
            return data
        }
    })

    const sortData = allData.sort((first, second) => new Date(second.time) - new Date(first.time))

    return (
        <div>
            <div className='py-5 mt-8 text-center'>
                <h2 className='text-3xl font-bold my-2 '>
                    Your Trust Our Commitment
                </h2>
                <p className='text-sm font-bold my-3 text-gray-400'>
                    We’re honored to earn the trust of our clients. Here are their honest reviews of our services
                </p>
            </div>
            <div className="lg:grid lg:grid-cols-3 my-3  gap-6 m-7">
                {
                    sortData.slice(0, 3).map(data => <SingleReview key={data._id} data={data}></SingleReview>)
                }
            </div>

        </div>
    );
};

export default ReviewSection;