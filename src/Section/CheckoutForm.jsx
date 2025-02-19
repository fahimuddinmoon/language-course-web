import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxios from "../Utility/UseAxios";
import { AuthContext } from "../Utility/AuthProvider";
import Payment from "../Page/Payment";
import Swal from "sweetalert2";


const CheckoutForm = ({ price,agentName,agentEmail,cartID}) => {
  const { user } = useContext(AuthContext)
  const axiosSecure = UseAxios()
  const [transactionId, setTransactionId] = useState(''); 
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe();
  const elements = useElements();


  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })


    }

  }, [axiosSecure, price])



  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log(error)
      setError(error.message)
    } else {
      console.log(paymentMethod)
      setError('')
    }


    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(clientSecret,
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
    if (confirmError) {
      console.log('confirm Error')
    }
    else {
      console.log('paymentIntent', paymentIntent)
      if (paymentIntent.status === 'succeeded'){
        setTransactionId(paymentIntent.id);

        const payment = {
          transactionId:paymentIntent.id, 
          agentName,
          agentEmail,
          cartID,
          bayerEmail:user.email,
          PaymentPrice :price
        }
        try{
         await axiosSecure.post('/paymentData',payment)
         await axiosSecure.patch(`/paymentData/update/${cartID}`)

           Swal.fire({
                          title: "Payment Successfully!",
                          icon: "success",
                          draggable: true
                      });
        }catch{
          Swal.fire({
            title: "Payment Not Successful!",
            icon: "error",
            draggable: true
        });
        }finally{
          
        }
      }
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
        <button className="m-5 w-6/12 mx-auto block py-2 bg-yellow-800 text-white font-bold rounded-2xl" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;