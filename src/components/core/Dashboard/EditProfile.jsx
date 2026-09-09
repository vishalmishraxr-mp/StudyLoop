import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile, getUserDetails } from "../../../services/operations/profileAPI";
import { setUser } from "../../../slices/profileSlice";

const EditProfile = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const additionalDetails = user?.additionalDetails || {};
        setDateOfBirth(additionalDetails.dateOfBirth?.slice(0, 10) || "");
        setGender(additionalDetails.gender || "");
        setContactNumber(additionalDetails.contactNumber || "");
        setAbout(additionalDetails.about || "");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await updateProfile(
            { dateOfBirth, gender, contactNumber, about },
            token
        );

        if (response.success) {
            const fresh = await getUserDetails(token);
            if (fresh.success) {
                dispatch(setUser(fresh.userDetails));
                localStorage.setItem("user", JSON.stringify(fresh.userDetails));
            }
            navigate("/dashboard/my-profile");
        }

        setLoading(false);
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold">Edit Profile</h1>

            <form onSubmit={handleSubmit} className="mt-6 max-w-xl rounded-2xl border border-gray-700 bg-gray-800 p-6">
                <div className="mb-5">
                    <label className="mb-2 block text-sm text-gray-300">Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    />
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-sm text-gray-300">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-sm text-gray-300">Contact Number</label>
                    <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter contact number"
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm text-gray-300">About</label>
                    <textarea
                        rows="4"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Tell us about yourself"
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    ></textarea>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/my-profile")}
                        className="rounded-lg border border-gray-600 px-5 py-2 font-semibold text-gray-300 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
