import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";

export default function DeleteAccount() {
    // Retrieve token from Redux store
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch(); // Get dispatch function
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    // Function to handle account deletion
    async function handleDeleteAccount() {
        try {
            // Dispatch deleteProfile action with token and navigate function
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    }

    return (
        <>
            <div className="my-10 flex flex-row gap-x-5 rounded-md border-1px border-pink-700 bg-pink-900 p-8 px-12">
                {/* Icon for delete account */}
                <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2 className="text-3xl text-pink-200" />
                </div>
                {/* Content for delete account */}
                <div className="flex flex-col space-y-2">
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Delete Account
                    </h2>
                    {/* Description */}
                    <div className="w-3/5 text-pink-25">
                        <p>You want to delete your account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is permanent and it will remove all the content associated with it.
                        </p>
                    </div>
                    {/* Delete account button */}
                    <button
                        type="button"
                        className="w-fit cursor-pointer italic text-pink-300"
                        onClick={handleDeleteAccount}
                    >
                        I want to delete my account
                    </button>
                </div>
            </div>
        </>
    );
}