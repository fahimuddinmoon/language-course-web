import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utility/AuthProvider";
import { imageUpload } from "../Utility/imgUpload";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
    const { googleLogin, createUser, profileUpdate, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        const image = e.target.image.files[0]
        const photoUrl = await imageUpload(image)

        try {
            await createUser(email, password)
            await profileUpdate({ displayName: name, photoURL: photoUrl });
            Swal.fire({
                title: "Account Created SuccessFully!",
                icon: "success",
                draggable: true
            });
            logout()
            navigate('/login')

        } catch (error) {
           
        }
    }
    return (

        <div className="w-10/12 mx-auto pt-16 lg:pt-24 text-black">
            <div className="card bg-base-100 w-8/12 mx-auto my-6 shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body ">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" placeholder="User Name" name="name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" placeholder="Photo" name="image" accept="image/*" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>

                    <div className="items-center">
                        <button onClick={googleLogin} className="justify-center items-center flex gap-3 mx-auto bg-slate-200 rounded-full mt-4 text-lg font-bold px-3 py-2 text-black"> Sign Up With Google <span className="text-2xl"><FcGoogle /></span></button>
                    </div>
                </form>
            </div>

        </div>




    );
};

export default Register;