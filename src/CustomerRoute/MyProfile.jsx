import UseProfile from "../Utility/UseProfile";
import UseRole from "../Utility/UseRole";


const MyProfile = () => {
    const [role] = UseRole()
    console.log(role)
    return (
        <div>
            <UseProfile></UseProfile>
        </div>
    );
};

export default MyProfile;