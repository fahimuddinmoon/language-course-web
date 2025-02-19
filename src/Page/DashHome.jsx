import { useContext } from "react";
import { AuthContext } from "../Utility/AuthProvider";

const DashHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="py-32">
             <h3 className="text-4xl font-semibold pt-6 px-6"> Hi {user.displayName} ...... </h3>

        </div>
    );
};

export default DashHome;