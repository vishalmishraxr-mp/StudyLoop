import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscSignOut, VscAccount } from "react-icons/vsc";

import useLogout from "../../../hooks/useLogout";

const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile);
    const logout = useLogout();

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2"
            >
                <img
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-9 w-9 rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-white" />
            </button>

            {open && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-md border border-gray-700 bg-gray-800 py-2 shadow-xl">
                    <div className="border-b border-gray-700 px-4 pb-2">
                        <p className="truncate text-sm font-semibold text-white">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                            {user?.email}
                        </p>
                    </div>

                    <Link
                        to="/dashboard/my-profile"
                        onClick={() => setOpen(false)}
                        className="mt-2 flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-200 transition hover:bg-gray-700"
                    >
                        <VscAccount className="text-lg" />
                        Dashboard
                    </Link>

                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 transition hover:bg-gray-700 hover:text-red-300"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropDown;
