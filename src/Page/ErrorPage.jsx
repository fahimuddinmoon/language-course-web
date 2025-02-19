import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div >
             <div className="text-center items-center h-screen bg-gray-200">
            <p className="text-4xl font-bold pt-40  lg:pt-72">Page Not Found</p>
            <p className="text-3xl font-extrabold my-7 text-blue-600">404</p>
            <p className="my-5 text-blue-400 hover:text-blue-700 text-sm font-semibold underline text-center"><Link to='/'>Back To Home</Link></p>
        </div>
        </div>
    );
};

export default ErrorPage;