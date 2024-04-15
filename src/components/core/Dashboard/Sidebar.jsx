import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

// Define Sidebar Component
export default function Sidebar() {
    // Redux State
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // State for Confirmation Modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    // Render spinner if profile or authentication data is loading
    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                {/* Render Sidebar Links */}
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        // Filter sidebar links based on user account type
                        if (link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        )
                    })}
                </div>
                {/* Separator */}
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
                {/* Settings Link */}
                <div className="flex flex-col">
                    <SidebarLink 
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                    {/* Logout Button */}
                    <button
                        onClick={() => 
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {/* Render Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }
        </>
    )
}