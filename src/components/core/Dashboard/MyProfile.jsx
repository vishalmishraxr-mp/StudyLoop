import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUserDetails } from "../../../services/operations/profileAPI";
import { setUser } from "../../../slices/profileSlice";
import { formatDate } from "../../../services/formatDate";

const MyProfile = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            const response = await getUserDetails(token);

            if (response.success) {
                dispatch(setUser(response.userDetails));
                localStorage.setItem("user", JSON.stringify(response.userDetails));
            }

            setLoading(false);
        };

        loadProfile();
    }, [token]);

    if (loading) {
        return <div className="p-8 text-white">Loading profile...</div>;
    }

    const additionalDetails = user?.additionalDetails || {};

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold">My Profile</h1>

            <div className="mt-6 flex items-center gap-6 rounded-2xl border border-gray-700 bg-gray-800 p-6">
                <img
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                    <p className="text-xl font-semibold">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400">{user?.email}</p>
                    <p className="mt-1 text-sm text-yellow-400">{user?.accountType}</p>
                </div>
                <Link
                    to="/dashboard/settings"
                    className="ml-auto rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500"
                >
                    Edit Profile
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-6 sm:grid-cols-2">
                <div>
                    <p className="text-sm text-gray-400">Date of Birth</p>
                    <p className="mt-1">{additionalDetails.dateOfBirth ? formatDate(additionalDetails.dateOfBirth) : "Not added"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Gender</p>
                    <p className="mt-1">{additionalDetails.gender || "Not added"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Contact Number</p>
                    <p className="mt-1">{additionalDetails.contactNumber || "Not added"}</p>
                </div>
                <div className="sm:col-span-2">
                    <p className="text-sm text-gray-400">About</p>
                    <p className="mt-1">{additionalDetails.about || "Not added"}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
