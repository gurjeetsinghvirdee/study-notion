import ChangedProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

// Component to manage user settings
export default function Settings() {
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            {/* Sub-components for managing different aspects of user settings */}
            <ChangedProfilePicture />       // Component for changing profile picture
            <EditProfile />                 // Component for editing profile details 
            <UpdatePassword />              // Component for updating password
            <DeleteAccount />               // Component for deleting account
        </>
    );
}