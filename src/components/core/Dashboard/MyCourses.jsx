// Import necessary modules and hooks
import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import API function for fetching instructor courses
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

// Import common components
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

// Define MyCourses component
export default function MyCourses() {
  // Get authentication token from Redux store
  const { token } = useSelector((state) => state.auth);
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // State to store instructor's courses
  const [courses, setCourses] = useState([]);

  // Effect to fetch instructor's courses on component mount
  useEffect(() => {
    // Function to fetch courses
    const fetchCourses = async () => {
      // Call API to fetch instructor's courses
      const result = await fetchInstructorCourses(token);
      // Update state with fetched courses
      if (result) {
        setCourses(result);
      }
    };
    // Invoke fetchCourses function
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Section header with add course button */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        {/* Add course button */}
        <IconBtn
          text="Add Course"
          // Redirect to add course page on button click
          onclick={() => navigate("/dashboard/add-course")}
        >
          {/* Add icon */}
          <VscAdd />
        </IconBtn>
      </div>
      {/* Render courses table if courses exist */}
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}