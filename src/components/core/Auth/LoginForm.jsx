import { useState } from "react"; // Importing useState hook from React
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing eye icons from react-icons library
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux for dispatching actions
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom for navigation

import { login } from "../../../services/operations/authAPI"; // Importing login function from authAPI service

// LoginForm component definition
function LoginForm() {
    const navigate = useNavigate(); // Initializing navigate function for navigation
    const dispatch = useDispatch(); // Initializing dispatch function for dispatching actions
    const [formData, setFormData] = useState({ // Initializing state for form data
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password input

    const { email, password } = formData; // Destructuring email and password from formData state

    // Function to handle changes in form inputs
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Function to handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate)); // Dispatching login action with email, password, and navigate function
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            {/* Email input */}
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input 
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" 
                />
            </label>
            {/* Password input */}
            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input 
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                    }} 
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                {/* Toggle password visibility */}
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ): (
                        <AiOutlineEye fontSize={24} fill="#AFV2BF" />
                    )}
                </span>
                {/* Forgot password link */}
                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>   
            {/* Sign in button */}
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
        </form>
    );
}

export default LoginForm;