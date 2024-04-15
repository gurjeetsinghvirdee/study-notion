import { FcGoogle } from "react-icons/fc"; // Importing Google icon from react-icons library
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux for accessing Redux store

import frameImg from "../../../assets/Images/frame.png"; // Importing image for the frame
import LoginForm from "./LoginForm"; // Importing LoginForm component
import SignupForm from "./SignupForm"; // Importing SignupForm component

// Template component definition
function Template({ title, description1, description2, image, formType }) {
    // Retrieving loading state from Redux store
    const { loading } = useSelector((state) => state.auth);

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? ( // If loading state is true, display spinner
                <div className="spinner"></div>
            ) : ( // Otherwise, render the main content
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                        {/* Title */}
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {title}
                        </h1>
                        {/* Description */}
                        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                            <span className="text-richblack-100">{description1}</span>{" "}
                            <span className="font-edu-sa font-bold italic text-blue-100">
                                {description2}
                            </span>
                        </p>
                        {/* Render either SignupForm or LoginForm based on formType */}
                        {formType === "signup" ? <SignupForm /> : <LoginForm />}
                    </div>
                    <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                        {/* Frame image */}
                        <img 
                            src={frameImg}
                            alt="Pattern"
                            width={558}
                            height={504}
                            loading="lazy"
                        />
                        {/* Image */}
                        <img 
                            src={image}
                            alt="Students"
                            width={558}
                            height={504}
                            loading="lazy"
                            className="absolute -top4 right-4 z-10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}