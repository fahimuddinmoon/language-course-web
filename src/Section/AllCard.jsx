import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import Card from "../Section/Card";
import { Link } from "react-router-dom";


const AllCard = () => {
    const axiosSecure = UseAxios()
    const { data: infos = [] } = useQuery({
        queryKey: ['infos'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/verifyProperty')
            return data
        }
    })
    return (

        <div>
            <div className='py-5 text-center'>
                <h2 className='text-3xl font-bold my-2 sm:p-2 mx-8 sm:mx-0'>
                    Sell Your Property Faster Than Ever
                </h2>
                <p className='text-sm font-bold mt-4 text-gray-400 sm:p-2 mx-8 sm:mx-0'>
                    Use our platform to sell your property. Get the best value and close deals quickly.
                </p>
            </div>
            <div className="py-6  sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-9 px-9">
                {
                   Array.isArray(infos) && infos.slice(0, 6).map(info => <Card key={info._id} info={info}></Card>)
                }
            </div>
            <button className="block mx-auto">
                <Link
                    to='allProperties'
                    className="text-white sm:font-bold bg-blue-600   py-3 px-5 rounded-full">
                    Show More
                </Link>
            </button>
        </div>
    );
};

export default AllCard;