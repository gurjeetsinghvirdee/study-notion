import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/Logo/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/Logo/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/Logo/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/Logo/TimeLineLogo/Logo4.svg";

// Array of timeline data
const TimeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Solve the Problem",
        Description: "Code your way to be a solution",
    },
];

// Component for timeline section
const TimelineSection = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
                {/* Left section displaying timeline items */}
                <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {TimeLine.map((ele, i) => {
                        return (
                            <div className="flex flex-col lg:gap-3" key={i}>
                                <div className="flex gap-6" key={i}>
                                    {/* Logo container */}
                                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                        <img src={ele.Logo} alt="" />
                                    </div>
                                    {/* Heading and Description */}
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                                        <p className="text-base">{ele.Description}</p>
                                    </div>
                                </div>
                                {/* Divider line between timeline items */}
                                <div
                                    className={`hidden ${
                                        TimeLine.length - 1 === i ? "hidden" : "lg:block"
                                    } h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                ></div>
                            </div>
                        );
                    })}
                </div>
                {/* Right section displaying timeline statistics and image */}
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                        {/* Statistics */}
                        <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                            <h1 className="text-3xl font-bold w-[75px]">10</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                Years Experiences
                            </h1>
                        </div>
                        <div className="flex gap-5 items-center lg:px-14 px-7">
                            <h1 className="text-3xl font-bold w-[75px]">250</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                types of courses
                            </h1>
                        </div>
                    </div>
                    {/* Timeline image */}
                    <img 
                        src={TimeLineImage} 
                        alt="timelineImage" 
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;