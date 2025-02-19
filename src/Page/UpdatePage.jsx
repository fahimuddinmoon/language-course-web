
import { useNavigate, useParams } from "react-router-dom";
import UseAxios from "../Utility/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../Utility/imgUpload";
import Swal from "sweetalert2";


const UpdatePage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const axiosSecure = UseAxios()
    
    const { data: info = [], refetch } = useQuery({
        queryKey: ['data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pendingProperty/${id}`)
            return data
        }
    })
    
    const { bayerEmail, bayerImg, bayerName, location, maxPrice, minPrice, status, title, _id } = info

    const handleSubmit = async e => {
        e.preventDefault()
        const bayerName = e.target.name.value
        const bayerEmail = e.target.email.value
        const title = e.target.title.value
        const location = e.target.location.value
        const minPrice = parseInt(e.target.minPrice.value)
        const maxPrice = parseInt(e.target.maxPrice.value)

        const photo = e.target.image.files[0]
        const Image = await imageUpload(photo)
        const info = { Image, bayerEmail, bayerImg, bayerName, location, maxPrice, minPrice, status, title }
        try {
            await axiosSecure.put(`/pendingProperty/${id}`, info)
            await axiosSecure.put(`/verifyProperty/${id}`, info)
            Swal.fire({
                title: "Property Update SuccessFully!",
                icon: "success",
                draggable: true
            });
            navigate('/dashboard/myAddProperties')
        } catch (error) {
            
        }finally{
            refetch()
        }
    }
    return (
        <div className=" w-full h-full px-4 text-black">
            <h2 className="text-center w-full text-2xl font-bold my-6">Update Equipment</h2>
            <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
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
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" disabled Value={bayerEmail} name="email" className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property title</span>
                            </label>
                            <input type="text" placeholder="Property title" name="title" defaultValue={title} className="input input-bordered" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Property location</span>
                            </label>
                            <input type="text" placeholder="Property location" name="location" defaultValue={location} className="input input-bordered" required />
                        </div>
                    </div>

                    <div className="sm:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Minimum Price</span>
                            </label>
                            <input type="number" placeholder="Minimum Price" name="minPrice" defaultValue={minPrice} className="input input-bordered" required />

                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Maximum Price</span>
                            </label>
                            <input type="number" placeholder="Maximum Price" name="maxPrice" defaultValue={maxPrice} className="input input-bordered" required />

                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" name="image" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update property</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default UpdatePage;