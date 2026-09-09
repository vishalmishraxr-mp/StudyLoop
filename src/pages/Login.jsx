import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";

import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/apis";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            if (!email || !password) {
                alert("Please enter email and password");
                return;
            }

            setLoading(true);

            const response = await apiConnector(
                "POST",
                auth.LOGIN_API,
                {
                    email,
                    password,
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            if (response.data.success) {

                // Save to localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Dispatch to Redux so Navbar updates immediately
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.user));

                alert("Login successful!");
                navigate("/");

            } else {

                alert(
                    response.data.message ||
                    "Login failed"
                );
            }

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-[#111927] flex items-center justify-center px-5 py-12">

            <div className="w-full max-w-md">

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-white text-3xl sm:text-4xl font-semibold">
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Login to continue learning with StudyLoop
                    </p>

                </div>


                {/* Login Card */}

                <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">


                    <form onSubmit={handleLogin}>


                        {/* Email */}

                        <div className="mb-6">

                            <label className="text-white text-lg block mb-3">
                                Email Address
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                className="w-full h-[50px] bg-gray-700 rounded-lg px-4 text-white text-lg outline-none border-b-2 border-gray-500 focus:border-yellow-400"
                            />

                        </div>


                        {/* Password */}

                        <div className="mb-4">

                            <label className="text-white text-lg block mb-3">
                                Password
                                <span className="text-red-500">*</span>
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="w-full h-[50px] bg-gray-700 rounded-lg px-4 pr-12 text-white text-lg outline-none border-b-2 border-gray-500 focus:border-yellow-400"
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >

                                    {showPassword ? (
                                        <EyeOff size={21} />
                                    ) : (
                                        <Eye size={21} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* Forgot Password */}

                        <div className="flex justify-end mb-6">

                            <Link
                                to="/forgot-password"
                                className="text-yellow-400 hover:text-yellow-300 transition"
                            >
                                Forgot Password?
                            </Link>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xl py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"
                            }

                        </button>


                        {/* Signup */}

                        <p className="text-gray-400 text-center mt-6">

                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="text-yellow-400 hover:text-yellow-300 font-semibold"
                            >
                                Sign Up
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );
};


export default Login;