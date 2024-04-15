// Import necessary modules and hooks
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

// Import Redux action
import { resetCourseState } from "../../../slices/courseSlice";

// Define SidebarLink component
export default function SidebarLink({ link, iconName }) {
    // Dynamically select icon based on iconName prop
    const Icon = Icons[iconName];
    // Get current location using useLocation hook
    const location = useLocation();
    // Get dispatch function from Redux
    const dispatch = useDispatch();

    // Function to match route with current location
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        // Navigation link with dynamic styling
        <NavLink
            to={link.path}
            onClick={() => dispatch(resetCourseState())} // Dispatch action to reset course state on link click
            className={`relative px-8 py-2 text-sm font-medium ${
                matchRoute(link.path) // Apply active link styling if route matches current location
                    ? "bg-yellow-800 text-yellow-50"
                    : "bg-opacity-0 text-richblack-300"
            } transition-all duration-200`}
        >
            {/* Active link indicator */}
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                    matchRoute(link.path) ? "opacity-100" : "opacity-0"
                }`}
            ></span>
            {/* Icon and link name */}
            <div className="flex items-center gap-x-2">
                <Icon className="text-lg" /> {/* Render dynamic icon */}
                <span>{link.name}</span> {/* Render link name */}
            </div>
        </NavLink>
    );
}