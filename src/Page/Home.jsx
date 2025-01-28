import Advertise from "../AdminRoute/Advertise";
import AdvertiseDisplay from "../Section/AdvertiseDisplay";
import AllCard from "../Section/AllCard";
import Banner from "../Section/Banner";
import ReviewSection from "../Section/ReviewSection";


const Home = () => {
    return (
        <div className="pt-28 mb-9">
            <div className="w-full">
                <Banner></Banner>
            </div>
            <AllCard></AllCard>
            <ReviewSection></ReviewSection>
            <AdvertiseDisplay></AdvertiseDisplay>
        </div>
    );
};

export default Home;