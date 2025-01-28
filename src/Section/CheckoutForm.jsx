import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxios from "../Utility/UseAxios";
import { AuthContext } from "../Utility/AuthProvider";


const CheckoutForm = ({price}) => {
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const offerPrice= {price}
    console.log(offerPrice)
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();

   

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
          }

          const card = elements.getElement(CardElement);

          if (card == null) {
            return;
          } 
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            
            setError(error.message)
          } else {
            
            setError('')
          }


          const {paymentIntent,confirmError} = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            }
          )
          if(confirmError){
            console.log('confirm Error')
          }
          else{
            console.log('paymentIntent', paymentIntent)
          }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="m-5 w-6/12 mx-auto block py-2 bg-yellow-800 text-white font-bold rounded-2xl" type="submit" disabled={!stripe || clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;