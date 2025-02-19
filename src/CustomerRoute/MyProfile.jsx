import UseProfile from "../Utility/UseProfile";
import UseRole from "../Utility/UseRole";


const MyProfile = () => {
    const [role] = UseRole()
    
    return (
        <div>
            <UseProfile></UseProfile>
        </div>
    );
};

export default MyProfile;