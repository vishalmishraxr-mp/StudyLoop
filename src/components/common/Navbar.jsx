import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logoImage from "../../asset/images/logo.png";
import { NavbarLink } from "../data/NavbarLink";
import { GrCart } from "react-icons/gr";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { apiConnector } from "../../services/apiConnector";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const location = useLocation();

    const matchRoute = (route) => {
        return location.pathname === route;
    };

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.categories || []);
        } catch (error) {
            console.log("Unable to fetch the category list:", error);
        }
    };

    useEffect(() => {
        fetchSubLinks();
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <div className="relative z-50 flex h-14 items-center justify-center border-b border-b-slate-700 bg-stone-950">
            <div className="flex w-11/12 max-w-maxContetnt items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <img
                        src={logoImage}
                        alt="StudyLoop"
                        className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
                    />
                    <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                        StudyLoop
                    </p>
                </Link>

                {/* DESKTOP NAV LINKS */}
                <nav className="hidden md:block">
                    <ul className="flex gap-6 text-white text-sm font-medium">
                        {NavbarLink.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <div className="group relative flex items-center gap-1 cursor-pointer">
                                        <p>{link.title}</p>
                                        <MdKeyboardArrowDown />

                                        {/* Dropdown */}
                                        <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-[300px] -translate-x-1/2 rounded-xl bg-white p-4 text-black opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
                                            {subLinks.length > 0 ? (
                                                subLinks.map((subLink) => (
                                                    <Link
                                                        key={subLink._id}
                                                        to={`/catalog/${subLink._id}`}
                                                        className="block rounded-lg p-2.5 transition hover:bg-gray-100"
                                                    >
                                                        <p className="font-semibold text-sm">{subLink.name}</p>
                                                        <p className="text-xs text-gray-500">{subLink.description}</p>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="p-2 text-gray-500 text-xs">Loading categories...</div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={matchRoute(link?.path) ? "text-yellow-400 font-semibold" : "text-gray-300 hover:text-white"}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* RIGHT SIDE ACTIONS */}
                <div className="flex items-center gap-x-3 sm:gap-x-4">
                    {/* CART */}
                    {user && user?.accountType !== "Instructor" && (
                        <Link
                            to="/dashboard/cart"
                            className="relative flex items-center justify-center rounded-full p-2 text-white hover:bg-slate-800"
                        >
                            <GrCart className="text-xl hover:text-yellow-400" />
                            {totalItems > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-black">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {!token && (
                        <div className="hidden sm:flex items-center gap-x-3">
                            <Link
                                to="/login"
                                className="rounded-lg bg-gray-800 px-4 py-1.5 text-sm font-semibold text-gray-200 border border-gray-700 hover:bg-gray-700 hover:text-white"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-lg bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-black hover:bg-yellow-500"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}

                    {token && <ProfileDropDown />}

                    {/* MOBILE HAMBURGER BUTTON */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg p-2 text-gray-300 hover:bg-gray-800 md:hidden"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* MOBILE NAVIGATION MENU DRAWER */}
            {mobileMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-stone-950 border-b border-gray-800 p-5 shadow-2xl md:hidden">
                    <ul className="flex flex-col gap-4 text-white font-medium">
                        {NavbarLink.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-gray-400">Categories / Catalog</p>
                                        <div className="grid grid-cols-1 gap-1 pl-2 border-l-2 border-yellow-400">
                                            {subLinks.map((subLink) => (
                                                <Link
                                                    key={subLink._id}
                                                    to={`/catalog/${subLink._id}`}
                                                    className="py-1.5 text-sm text-gray-200 hover:text-yellow-400"
                                                >
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={link?.path}
                                        className={`block text-base ${matchRoute(link?.path) ? "text-yellow-400 font-semibold" : "text-gray-200"}`}
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {!token && (
                        <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-gray-800 sm:hidden">
                            <Link
                                to="/login"
                                className="w-full text-center rounded-lg bg-gray-800 py-2.5 text-sm font-semibold text-white border border-gray-700"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="w-full text-center rounded-lg bg-yellow-400 py-2.5 text-sm font-semibold text-black"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;