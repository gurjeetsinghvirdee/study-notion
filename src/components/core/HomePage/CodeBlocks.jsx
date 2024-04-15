import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

// Component for displaying code blocks with heading, subheading, and buttons
const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
            {/* Left section with heading, subheading, and buttons */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading /* Heading component */}

                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading /* Subheading */}
                </div>

                <div className="flex gap-7 mt-7">
                    {/* First Call-to-Action button */}
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText /* Text for the first button */}
                            <FaArrowRight /* Right arrow icon */ />
                        </div>
                    </CTAButton>
                    {/* Second Call-to-Action button */}
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                        {ctabtn2.btnText /* Text for the second button */}
                    </CTAButton>
                </div>
            </div>

            {/* Right section with code block */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {backgroundGradient /* Background gradient for the code block */}
                {/* Line numbers */}
                <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold">
                    {[...Array(11).keys()].map((num) => (
                        <p key={num}>{num + 1}</p>
                    ))}
                </div>

                {/* Code block */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    {/* TypeAnimation component to animate typing effect */}
                    <TypeAnimation 
                        sequence={[codeblock, 1000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;