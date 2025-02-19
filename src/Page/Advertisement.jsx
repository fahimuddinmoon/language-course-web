import { useParams } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import Swal from "sweetalert2";


const Advertisement = () => {
    const { id } = useParams()
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = [], isLoading } = useQuery({
        queryKey: ['infos'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/verifyProperty/${id}`)
            return data
        }
    })
   
    const handleAdvertise = async (e) => {
        e.preventDefault()
        const advertise = e.target.textArea.value
        const adminEmail = user.email
        const adminIMG = user.photoURL
        
        const propertyTitle = infos.title
        const propertyLocation = infos.location
        if(advertise.length < 200 || advertise.length > 250){
           return Swal.fire({
                title: "Advertise Length Minimum 35 words & Maximum 45 words!",
                icon: "error",
                draggable: true
            });
            
        }
        const data = {advertise,adminEmail,adminIMG,propertyTitle,propertyLocation}
       try{
        await axiosSecure.post('/advertise',data)
        Swal.fire({
            title: "Added SuccessFully!",
            icon: "success",
            draggable: true
        });
       }catch(error){

       }
    }
    return (
        <div className="text-center">
            <h2 className='text-3xl my-9 font-bold '>
                Advertisement Of This Property
            </h2>
            <form onSubmit={(e) => handleAdvertise(e)}>
                <h3 className="text-yellow-800 text-lg font-bold my-2">Advertisement</h3>
                <textarea className="textarea textarea-warning my-2 text-black h-56 w-72" name="textArea" placeholder=""></textarea><br></br>
                <button className="w-60 bg-yellow-800 py-2 rounded-2xl text-sm font-bold text-gray-300">Submit</button>
            </form>
        </div>
    );
};

export default Advertisement;