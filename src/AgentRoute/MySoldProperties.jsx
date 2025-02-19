import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Page/Loading";


const MySoldProperties = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: paymentAllData = [], isLoading, refetch } = useQuery({
        queryKey: ['paymentAllData', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/paymentData/${user?.email}`)
            return data
        }
    })
  if(isLoading)return <Loading></Loading>
    return (
        <div>
            <h2 className="text-2xl font-bold my-5 text-center">My sold properties</h2>

            <div className="overflow-x-auto ">
                <table className='table'>

                    <thead>
                        <tr className="text-blue-500">
                           
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Payment Price</th>
                            <th>Bayer Email</th>
                            <th>Transaction Id</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {
                            paymentAllData.map(info =>
                                <tr className="" key={info._id}>
                                    <th>{info.agentName}</th>
                                    <td className="text-sm font-bold">{info.agentEmail}</td>
                                    <td className="text-sm font-bold">{info.PaymentPrice}</td>
                                    <td className="text-sm font-bold">{info.bayerEmail}$</td>
                                    <td className="text-sm font-bold">{info.transactionId}</td>                                  
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperties;