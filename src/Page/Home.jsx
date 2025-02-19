import { useContext } from "react";
import Advertise from "../AdminRoute/Advertise";
import AdvertiseDisplay from "../Section/AdvertiseDisplay";
import AllCard from "../Section/AllCard";
import Banner from "../Section/Banner";
import ReviewSection from "../Section/ReviewSection";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";


const Home = () => {
     const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = [], refetch } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/mode/Change/${user.email}`)
            return data
        }
    })

    return ( 
        <div className={infos.mode === 'dark'?'bg-black text-white pt-16 md:pt-20 lg:pt-28 mb-9':'pt-16 md:pt-20 lg:pt-28 mb-9'}>
            <div >
                <Banner></Banner>
            </div>
            <AllCard></AllCard>
            <ReviewSection></ReviewSection>
            <AdvertiseDisplay></AdvertiseDisplay>
        </div>
    );
};

export default Home;