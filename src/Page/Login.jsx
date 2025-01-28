import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utility/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value


        login(email, password)
            .then(result => {

                Swal.fire({
                    title: "Login SuccessFully!",
                    icon: "success",
                    draggable: true
                });
                navigate('/')

            }).catch((error) => {

                Swal.fire({
                    title: "Something Else . Please Try Again!",
                    icon: "error",
                    draggable: true
                });
            });
    }

    return (
        <div className="w-10/12 mx-auto pt-16 lg:pt-24 text-black">
            <div className="card bg-base-100 w-8/12 mx-auto my-6 shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center text-black">
                        You Have No Account Please<Link className="text-lg font-bold text-red-700" to='/register'> Register </Link>
                    </div>

                </form>
            </div>


        </div>
    );
};

export default Login;