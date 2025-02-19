import { useNavigate, useParams } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import Swal from "sweetalert2";
import UseRole from "../Utility/UseRole";


const Offer = () => {
    const [dataName] = UseRole()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const axiosSecure = UseAxios()

    const { data: info = [], refetch } = useQuery({
        queryKey: ['data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/wish/${id}`)
            return data
        }
    })

    const { Image, bayerEmail: agentEmail, bayerImg, bayerName, location, maxPrice, minPrice, status, title, _id } = info
    console.log(bayerName, agentEmail)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const agentName = e.target.name.value
        const title = e.target.title.value
        const location = e.target.location.value
        const offeredPrice = parseInt(e.target.offeredPrice.value)
        const bayerName = e.target.userName.value
        const bayerEmail = e.target.userEmail.value
        if (dataName === 'agent' && dataName === 'admin') {
            return Swal.fire({
                title: 'yor are not Costumer!',
                icon: "error",
                draggable: true
            });
        }
        if (offeredPrice < minPrice) {
            return Swal.fire({
                title: 'Please Increase Your Offer Price!',
                icon: "error",
                draggable: true
            });
        }
        const data = { agentName, title, location, offeredPrice, bayerName, bayerEmail, status: 'pending', agentEmail, Image }
        try {
            await axiosSecure.post('offered', data)
            Swal.fire({
                title: "Property Bought Request Send SuccessFully!",
                icon: "success",
                draggable: true
            });
        } catch (error) {

        }
    }

    return (
        <div>
            <div className="card bg-base-100 w-full text-black shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" disabled Value={bayerName} name="name" className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property title</span>
                            </label>
                            <input type="text" placeholder="Property title" disabled Value={title} name="title" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property location</span>
                            </label>
                            <input type="text" placeholder="Property location" disabled Value={location} name="location" className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Offered Price</span>
                            </label>
                            <input type="number" placeholder="Offered Price" name="offeredPrice" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" disabled Value={user?.displayName} name="userName" className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" disabled Value={user?.email} name="userEmail" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Offer</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Offer;