import { useContext } from "react";
import UseRole from "./UseRole";
import { AuthContext } from "./AuthProvider";


const UseProfile = () => {
    const [dataName] = UseRole()
    const { user } = useContext(AuthContext)

    return (
        <div className="my-8 text-center ">
            <img className="mx-auto w-32 h-32 object-cover rounded-full " src={user?.photoURL} alt="" />
            <p className="my-8"><span className="text-xl font-bold text-white px-3 py-2 bg-green-400  rounded-xl">{dataName}</span></p>
            <h3 className="text-xl font-bold text-yellow-600 my-2">{user?.displayName}</h3>
            <p className="text-xl font-bold text-gray-600 my-2">{user?.email}</p>
        </div>
    );
};

export default UseProfile;