// Import necessary modules and hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import API function for updating profile
import { updateProfile } from "../../../../services/operations/SettingsAPI";

// Import common component
import IconBtn from "../../../common/IconBtn";

// Array of gender options
const genders = ["Male", "Female", "Trans-Gender", "Prefer not to say", "Other"];

// Define EditProfile component
export default function EditProfile() {
    // Redux state
    const { user } = useSelector((state) => state.profile); // Get user profile from Redux store
    const { token } = useSelector((state) => state.auth); // Get authentication token from Redux store
    const navigate = useNavigate(); // Get navigation function from react-router-dom
    const dispatch = useDispatch(); // Get dispatch function from Redux

    // Form handling using react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm(); // Form control functions and state from react-hook-form

    // Function to handle form submission
    const submitProfileForm = async (data) => {
        try {
            // Dispatch action to update user profile with updated data
            dispatch(updateProfile(token, data));
            navigate("/dashboard/my-profile"); // Redirect to My Profile page after successful update
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message); // Log any errors that occur during profile update
        }
    }

    return (
        <>
            {/* Profile information form */}
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Form fields */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    {/* First name and last name fields */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                First Name
                            </label>
                            {/* First name input field */}
                            <input 
                                type="text"
                                name="firstName" 
                                id="firstName"
                                placeholder="Enter Your First Name"
                                className="form-style"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {/* Error message for first name */}
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your First Name
                                </span>
                            )}
                        </div>
                        {/* Last name field */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                Last Name
                            </label>
                            {/* Last name input field */}
                            <input 
                                type="text"
                                name="lastName" 
                                id="lastName"
                                placeholder="Enter Your Last Name"
                                className="form-style"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {/* Error message for last name */}
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your Last Name
                                </span>
                            )}
                        </div>
                    </div>
                    
                    {/* Date of birth and gender fields */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="lable-style">
                                Date of Birth
                            </label>
                            {/* Date of birth input field */}
                            <input 
                                type="date"
                                name="dateOfBirth" 
                                id="dateOfBirth"
                                className="form-style"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth"
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future"
                                    }, 
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {/* Error message for date of birth */}
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                Gender
                            </label>
                            {/* Gender selection dropdown */}
                            <select 
                                type="text"
                                name="gender" 
                                id="gender"
                                className="form-style"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {/* Mapping gender options */}
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>
                            {/* Error message for gender */}
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter your Date of Birth
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Contact number and about fields */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="lable-style">
                                Contact Number
                            </label>
                            {/* Contact number input field */}
                            <input 
                                type="tel"
                                name="contactNumber" 
                                id="contactNumber"
                                className="form-style"
                                placeholder="Enter Your Contact Number"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Contact Number"
                                    },
                                    maxLength: { value: 12, message: "Invalid Contact Number" },
                                    minLength: { value: 10, message: "Invalid Contact Number" }
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {/* Error message for contact number */}
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                About
                            </label>
                            {/* About input field */}
                            <input 
                                type="text"
                                name="about" 
                                id="about"
                                className="form-style"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {/* Error message for about field */}
                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please write something About You...
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons for cancelling and saving */}
                <div className="flex justify-end gap-2">
                    {/* Cancel button */}
                    <button 
                        className="cursor-pointer bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                    >
                        Cancel
                    </button>
                    {/* Save button */}
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}