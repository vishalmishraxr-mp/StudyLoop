import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { VscAccount, VscSettingsGear, VscSignOut, VscMortarBoard, VscBook, VscAdd } from "react-icons/vsc";
import { GrCart } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";

import useLogout from "../../../hooks/useLogout";
import ACCOUNT_TYPE from "../../../services/utils/constants";

const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm whitespace-nowrap transition ${
        isActive ? "bg-yellow-400 text-black font-semibold" : "text-gray-300 hover:bg-gray-800"
    }`;

const Sidebar = () => {
    const { user } = useSelector((state) => state.profile);
    const logout = useLogout();

    return (
        <div className="flex w-full shrink-0 flex-row overflow-x-auto border-b border-gray-700 bg-gray-900 px-2 py-2 md:w-64 md:flex-col md:border-b-0 md:border-r md:px-0 md:py-6 scrollbar-none">
            <nav className="flex flex-1 flex-row gap-1.5 md:flex-col md:gap-1 md:px-3">
                <NavLink to="/dashboard/my-profile" className={linkClass}>
                    <VscAccount className="text-base" /> <span>My Profile</span>
                </NavLink>

                <NavLink to="/dashboard/settings" className={linkClass}>
                    <VscSettingsGear className="text-base" /> <span>Settings</span>
                </NavLink>

                {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                        <NavLink to="/dashboard/enrolled-courses" className={linkClass}>
                            <VscBook className="text-base" /> <span>Enrolled Courses</span>
                        </NavLink>
                        <NavLink to="/dashboard/cart" className={linkClass}>
                            <GrCart className="text-base" /> <span>Cart</span>
                        </NavLink>
                    </>
                )}

                {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                    <>
                        <NavLink to="/dashboard/instructor" className={linkClass}>
                            <VscMortarBoard className="text-base" /> <span>My Courses</span>
                        </NavLink>
                        <NavLink to="/dashboard/add-course" className={linkClass}>
                            <VscAdd className="text-base" /> <span>Add Course</span>
                        </NavLink>
                    </>
                )}

                {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                    <NavLink to="/dashboard/admin" className={linkClass}>
                        <RiAdminLine className="text-base" /> <span>Admin Panel</span>
                    </NavLink>
                )}
            </nav>

            <button
                onClick={logout}
                className="ml-auto flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs sm:text-sm text-red-400 transition hover:bg-gray-800 hover:text-red-300 md:mx-3 md:ml-0 md:mt-4"
            >
                <VscSignOut className="text-base" /> <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
