import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import UseRole from "../Utility/UseRole";


const CardDetails = () => {
    const [dataName] = UseRole()
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: info = [] } = useQuery({
        queryKey: ['data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/verifyProperty/${id}`)
            return data
        }
    })

    const { Image, bayerEmail, bayerImg, bayerName, location, maxPrice, minPrice, status, title, _id } = info

    const handleWish = async () => {
        if(dataName === 'agent' || dataName === 'admin'){
            return Swal.fire({
                title: "You Are Not Customer!",
                icon: "error",
                draggable: true
            });
            
        }
        const data = { email: user?.email, Image, bayerEmail, bayerImg, bayerName, location, maxPrice, minPrice, status, title, propertyId: _id }
        try {
            await axiosSecure.post('/wishlist', data)
            Swal.fire({
                title: "Added SuccessFully!",
                icon: "success",
                draggable: true
            })
        } catch (error) {

        }
    }
    const handleReview = async (e) => {
        e.preventDefault()
    
        const review = e.target.textArea.value
        const reviewerEmail = user?.email
        const reviewerName = user?.displayName
        const reviewerImg = user?.photoURL
        const propertyTitle = title
        const time = new Date()
         if(review.length < 200 || review.length > 250){
                   return Swal.fire({
                        title: "Advertise Length Minimum 35 words & Maximum 45 words!",
                        icon: "error",
                        draggable: true
                    });
                    
                }
        const reviewData = { review, reviewerEmail, reviewerImg, reviewerName, propertyTitle,time }
        
        try {

            await axiosSecure.post('/reviews',reviewData)
            Swal.fire({
                title: "Review Added SuccessFully!",
                icon: "success",
                draggable: true
            })
            
        } catch (error) {

        }finally{
        
        }
    }

    return (
        <div className="mx-2 sm:mx-0 pt-20  lg:pt-24 ">

            <div className=" w-full bg-yellow-600 lg:w-9/12 lg:grid lg:grid-cols-3 gap-9 p-5 mx-auto my-7  rounded-lg ">
                <div className="">
                    <img className="w-56  rounded-lg" src={Image} alt="" />
                </div>
                <div >
                    <img className="w-12 mb-3 h-12 rounded-full" src={bayerImg} alt="" />
                    <h2 className="text-sm font-semibold mb-2">Seller Name :- {bayerName} </h2>
                    <p className="text-sm font-semibold mb-2">Seller Email :- {bayerEmail} </p>
                    <p className="card-title text-2xl font-bold">Property Name :- {title}  </p>
                    <p className="text-xl font-semibold mb-2">Property Location :- {location}  </p>
                    <p className="text-xl font-semibold mb-2">Price :- {minPrice} - {maxPrice} </p>
                    <p className="text-xl font-semibold mb-2">Status :- {status} </p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleWish(_id)}
                            className="bg-black py-1 px-3 border-2 border-gray-800 rounded-full text-white font-semibold text-lg">
                            Add TO Wishlist
                        </button>
                    </div>
                </div>
                <div>
                    <form onSubmit={(e) => handleReview(e)}>
                        <h3 className="text-white text-lg font-bold my-2">User Opinion / Review</h3>
                        <textarea className="textarea textarea-warning my-2 text-black h-44 w-60" name="textArea" placeholder=""></textarea>
                        <button className="w-60 bg-yellow-800 py-2 rounded-2xl text-sm font-bold text-gray-300">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;