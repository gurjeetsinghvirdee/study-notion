import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

// CourseCard component to display course information
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    return (
        <div
            className={`w-[360px] lg:w-[30%] ${
                // Dynamically set background color and shadow based on whether it's the current card
                currentCard === cardData?.heading
                    ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
                    : "bg-richblack-800"
            }   text-richblack-25 h-[300px] box-border cursor-pointer`}
            onClick={() => setCurrentCard(cardData?.heading)}
        >
            <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
                {/* Display course heading */}
                <div
                    className={`${
                        currentCard === cardData?.heading && "text-richblack-800"
                    }   font-semibold text-[20px]`}
                >
                    {cardData?.heading}
                </div>

                {/* Display course description */}
                <div className="text-richblack-400">{cardData?.description}</div>
            </div>

            <div
                className={`flex justify-between ${
                    // Dynamically set text color based on whether it's the current card
                    currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
                }   px-6 py-3 font-medium`}
            >
                {/* Display course level */}
                <div className="flex items-center gap-2 text-[16px]">
                    <HiUsers />
                    <p>{cardData?.level}</p>
                </div>

                {/* Display number of lessons */}
                <div className="flex items-center gap-2 text-[16px]">
                    <ImTree />
                    <p>{cardData?.lessionNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;