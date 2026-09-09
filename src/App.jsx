import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/courseDetail";
import Cart from "./pages/Cart";
import ViewCourse from "./pages/ViewCourse";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

import MyProfile from "./components/core/Dashboard/MyProfile";
import EditProfile from "./components/core/Dashboard/EditProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard";

import ACCOUNT_TYPE from "./services/utils/constants";
import Navbar from "./components/common/Navbar";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import { Toaster } from "react-hot-toast";
function PrivateRoute() {
    const { token } = useSelector((state) => state.auth);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function RequireRole({ role }) {
    const { user } = useSelector((state) => state.profile);

    return user?.accountType === role ? <Outlet /> : <Navigate to="/dashboard/my-profile" replace />;
}

function App() {
    return (
        <div className="w-screen min-h-screen bg-stone-950 flex flex-col font-inter">
<Navbar />
            <Toaster />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/catalog/:categoryId"
                    element={<Catalog />}
                />

                <Route
                    path="/course/:courseId"
                    element={<CourseDetail />}
                />

                <Route
    path="/signup"
    element={<Signup />}
/>
{/* Auth related pages */}
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/update-password/:token" element={<ResetPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
{/* Info pages */}
<Route path="/contact" element={<ContactUs />} />
<Route path="/about" element={<AboutUs />} />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<PrivateRoute />}>
                    <Route
                        path="/dashboard/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/dashboard/view-course/:courseId"
                        element={<ViewCourse />}
                    />

                    <Route
                        path="/dashboard/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<ViewCourse />}
                    />

                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Navigate to="my-profile" replace />} />
                        <Route path="my-profile" element={<MyProfile />} />
                        <Route path="settings" element={<EditProfile />} />

                        <Route element={<RequireRole role={ACCOUNT_TYPE.STUDENT} />}>
                            <Route path="enrolled-courses" element={<EnrolledCourses />} />
                        </Route>

                        <Route element={<RequireRole role={ACCOUNT_TYPE.INSTRUCTOR} />}>
                            <Route path="instructor" element={<InstructorDashboard />} />
                            <Route path="add-course" element={<AddCourse />} />
                            <Route path="edit-course/:courseId" element={<AddCourse />} />
                        </Route>

                        <Route element={<RequireRole role={ACCOUNT_TYPE.ADMIN} />}>
                            <Route path="admin" element={<AdminDashboard />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
