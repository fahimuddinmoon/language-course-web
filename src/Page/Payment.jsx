import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Section/CheckoutForm";
import { useParams } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";


const Payment = () => {
    const {id} = useParams()
    const axiosSecure = UseAxios()
    const { data: infos = [], isLoading } = useQuery({
        queryKey: ['infos'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offered/single/${id}`)
            return data
        }
    })
    const{offeredPrice}=infos
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API)
    return (
        <div>
            <h3>Payment</h3>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={offeredPrice}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;