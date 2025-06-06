import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Utility/UseAxios";
import MapAdvertise from "./MapAdvertise";


const AdvertiseDisplay = () => {
    const axiosSecure = UseAxios()
    const { data: Advertises = [], refetch } = useQuery({
        queryKey: ['Advertises'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/advertise')
            return data
        }
    })
    return (
        <div>
            <h2 className='text-3xl my-9 font-bold text-center'>
                Advertisement
            </h2>

            <div className="lg:grid lg:grid-cols-4 gap-9 m-10">
                {
                    Advertises.slice(0, 4).map(data => <MapAdvertise key={data._id} data={data}></MapAdvertise>)
                }
            </div>
        </div>
    );
};

export default AdvertiseDisplay;