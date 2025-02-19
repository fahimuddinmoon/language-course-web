import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";
import { imageUpload } from "../Utility/imgUpload";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";

const AddProperty = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        const bayerName = e.target.name.value
        const bayerImg = user?.photoURL
        const bayerEmail = e.target.email.value
        const title = e.target.title.value
        const location = e.target.location.value
        const minPrice = parseInt(e.target.minPrice.value)
        const maxPrice = parseInt(e.target.maxPrice.value)

        const photo = e.target.image.files[0]
        const Image = await imageUpload(photo)
        const info = { bayerName, bayerEmail, title, location, minPrice, maxPrice, Image, status: 'pending',bayerImg }


        try {
            await axiosSecure.post('/pendingProperty', info)
            Swal.fire({
                title: "Property Added Request Send SuccessFully!",
                icon: "success",
                draggable: true
            });
            navigate('/dashboard/myAddProperties')
        } catch (error) {
            Swal.fire({
                title: `${error}`,
                icon: "error",
                draggable: true
            });
        }

    }
    return (
        <div className=" w-full h-full px-4 text-black">
            <h2 className="text-center w-full text-2xl font-bold my-6">Add Equipment</h2>
            <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" Value={user?.displayName} name="name" className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" Value={user?.email} name="email" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property title</span>
                            </label>
                            <input type="text" placeholder="Property title" name="title" className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property location</span>
                            </label>
                            <input type="text" placeholder="Property location" name="location" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Minimum Price</span>
                            </label>
                            <input type="number" placeholder="Minimum Price" name="minPrice" className="input input-bordered" required />

                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Maximum Price</span>
                            </label>
                            <input type="number" placeholder="Maximum Price" name="maxPrice" className="input input-bordered" required />

                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" name="image" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add property</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default AddProperty;