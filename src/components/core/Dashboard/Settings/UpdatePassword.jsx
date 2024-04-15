import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
    // Redux state
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // State for toggling password visibility
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Form handling using react-hook-form
    const { register, handleSubmit, formSate: {errors} } = useForm();

    // Function to submit password change form
    const submitPasswordForm = async (data) => {
        try {
            // Call changePassword API function with token and form data
            await changePassword(token, data);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                {/* Password change form */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Current Password field */}
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">
                                Current Password
                            </label>
                            <input 
                                type={showOldPassword ? "text" : "password"} 
                                name="oldPassword" 
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className="form-style"
                                {...register("oldPassword", { required: true })} 
                            />
                            {/* Toggle visibility of current password */}
                            <span 
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                onClick={() => setShowOldPassword((prev) => !prev)}
                            >
                                {showOldPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {/* Validation error message for current password */}
                            {errors.oldPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Current password
                                </span>
                            )}
                        </div>
                        {/* New Password field */}
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassword" className="lable-style">
                                New Password
                            </label>
                            <input 
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="form-style"
                                {...register("newPassword", { required: true })}
                            />
                            {/* Toggle visibility of new password */}
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showNewPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {/* Validation error message for new password */}
                            {errors.newPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter your New Password
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Buttons for form submission and cancellation */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            // Redirect to My Profile page on cancel
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Update" />
                </div>
            </form>
        </>
    )
}