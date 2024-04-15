// Import necessary modules and hooks
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Import common component
import IconBtn from "../../common/IconBtn";

// Define VideoDetailsSidebar component
export default function VideoDetailsSidebar({ setReviewModal }) {
  // State for active status and video bar activation
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Get current location using useLocation hook
  const location = useLocation();
  // Get route parameters using useParams hook
  const { sectionId, subSectionId } = useParams();
  // Redux state
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.auth);

  // Effect to update active status and video bar activation based on route parameters
  useEffect(() => {
    // Function to update active status and video bar activation
    const updateActiveStatusAndVideoBar = () => {
      // Check if course section data is available
      if (!courseSectionData.length) return;
      // Find index of current section
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      // Find index of current subsection
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      // Get active subsection ID
      const activeSubsectionId = courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;
      // Update active status and video bar activation
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubsectionId);
    };

    // Call the update function
    updateActiveStatusAndVideoBar();
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  return (
    <>
      {/* Sidebar container */}
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* Sidebar header */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* Back button and Add Review button */}
          <div className="flex w-full items-center justify-between">
            {/* Back button */}
            <div
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            {/* Add Review button */}
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          {/* Course details */}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* Course sections and subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                {/* Chevron icon for toggling subsections */}
                <div className="flex items-center gap-3">
                  <span
                    className={`${activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                      } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Subsections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                        }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      {/* Checkbox indicating completed lectures */}
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                      />
                      {/* Subsection title */}
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}