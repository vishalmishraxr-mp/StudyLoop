import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
    getAdminStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllCoursesAdmin,
    createTag,
    updateTag,
    deleteTag,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../../services/operations/adminAPI";
import { getAllCategories, getAllTags, changeCourseStatus, deleteCourse } from "../../../services/operations/courseCreateAPI";

const AdminDashboard = () => {
    const { token } = useSelector((state) => state.auth);

    const [activeTab, setActiveTab] = useState("overview"); // overview, tags_categories, users, courses
    const [loading, setLoading] = useState(true);

    // Overview Stats
    const [stats, setStats] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentCourses, setRecentCourses] = useState([]);

    // Tags & Categories
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tagName, setTagName] = useState("");
    const [tagDesc, setTagDesc] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");

    // Editing states for Tags & Categories
    const [editingTag, setEditingTag] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    // Users
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState("");

    // Courses
    const [platformCourses, setPlatformCourses] = useState([]);

    const loadAdminData = async () => {
        setLoading(true);

        const statsRes = await getAdminStats(token);
        if (statsRes.success) {
            setStats(statsRes.stats);
            setRecentUsers(statsRes.recentUsers || []);
            setRecentCourses(statsRes.recentCourses || []);
        }

        const tagsRes = await getAllTags();
        setTags(tagsRes.data || []);

        const catRes = await getAllCategories();
        setCategories(catRes.categories || []);

        const usersRes = await getAllUsers(token, roleFilter);
        setUsers(usersRes.users || []);

        const coursesRes = await getAllCoursesAdmin(token);
        setPlatformCourses(coursesRes.courses || []);

        setLoading(false);
    };

    useEffect(() => {
        loadAdminData();
    }, [token, roleFilter]);

    // Handle Tag Creation / Update
    const handleTagSubmit = async (e) => {
        e.preventDefault();
        if (!tagName.trim()) return;

        if (editingTag) {
            const res = await updateTag(editingTag._id, tagName, tagDesc, token);
            if (res.success) {
                setEditingTag(null);
                setTagName("");
                setTagDesc("");
                const tagsRes = await getAllTags();
                setTags(tagsRes.data || []);
            }
        } else {
            const res = await createTag(tagName, tagDesc, token);
            if (res.success) {
                setTagName("");
                setTagDesc("");
                const tagsRes = await getAllTags();
                setTags(tagsRes.data || []);
            }
        }
    };

    const handleDeleteTag = async (tagId) => {
        if (!window.confirm("Are you sure you want to delete this tag?")) return;
        const res = await deleteTag(tagId, token);
        if (res.success) {
            setTags(tags.filter((t) => t._id !== tagId));
        }
    };

    // Handle Category Creation / Update
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        if (editingCategory) {
            const res = await updateCategory(editingCategory._id, categoryName, categoryDesc, token);
            if (res.success) {
                setEditingCategory(null);
                setCategoryName("");
                setCategoryDesc("");
                const catRes = await getAllCategories();
                setCategories(catRes.categories || []);
            }
        } else {
            const res = await createCategory(categoryName, categoryDesc, token);
            if (res.success) {
                setCategoryName("");
                setCategoryDesc("");
                const catRes = await getAllCategories();
                setCategories(catRes.categories || []);
            }
        }
    };

    const handleDeleteCategory = async (catId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        const res = await deleteCategory(catId, token);
        if (res.success) {
            setCategories(categories.filter((c) => c._id !== catId));
        }
    };

    // Handle User Role Change
    const handleRoleChange = async (userId, newRole) => {
        const res = await updateUserRole(userId, newRole, token);
        if (res.success) {
            setUsers(users.map((u) => (u._id === userId ? { ...u, accountType: newRole } : u)));
        }
    };

    const handleDeleteUserAccount = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        const res = await deleteUser(userId, token);
        if (res.success) {
            setUsers(users.filter((u) => u._id !== userId));
        }
    };

    // Handle Course Moderation
    const handleToggleCourseStatus = async (courseId, currentStatus) => {
        const newStatus = currentStatus === "Published" ? "Draft" : "Published";
        const res = await changeCourseStatus(courseId, newStatus, token);
        if (res.success) {
            setPlatformCourses(
                platformCourses.map((c) => (c._id === courseId ? { ...c, status: newStatus } : c))
            );
        }
    };

    const handleDeletePlatformCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course from the platform?")) return;
        const res = await deleteCourse(courseId, token);
        if (res.success) {
            setPlatformCourses(platformCourses.filter((c) => c._id !== courseId));
        }
    };

    if (loading) {
        return <div className="p-8 text-white">Loading Admin Control Panel...</div>;
    }

    return (
        <div className="p-4 sm:p-8 text-white">
            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
            <p className="mt-1 text-sm text-gray-400">
                Manage tags, categories, platform users, course moderation, and overview analytics.
            </p>

            {/* Navigation Tabs */}
            <div className="mt-6 flex flex-wrap border-b border-gray-700 gap-2">
                {[
                    { id: "overview", label: "📊 Overview Stats" },
                    { id: "tags_categories", label: "🏷️ Tags & Categories" },
                    { id: "users", label: "👥 User Management" },
                    { id: "courses", label: "📚 Platform Courses" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-3 text-sm font-medium transition-all ${
                            activeTab === tab.id
                                ? "border-b-2 border-yellow-400 font-semibold text-yellow-400 bg-gray-800/50"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && stats && (
                <div className="mt-6 space-y-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                            <h3 className="mt-2 text-3xl font-bold text-yellow-400">₹{stats.totalRevenue.toLocaleString()}</h3>
                            <p className="mt-1 text-xs text-gray-500">From student enrollments</p>
                        </div>
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <p className="text-sm font-medium text-gray-400">Total Users</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{stats.totalUsers}</h3>
                            <p className="mt-1 text-xs text-gray-400">
                                👨‍🎓 {stats.totalStudents} Students | 👨‍🏫 {stats.totalInstructors} Instructors
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <p className="text-sm font-medium text-gray-400">Total Courses</p>
                            <h3 className="mt-2 text-3xl font-bold text-green-400">{stats.totalCourses}</h3>
                            <p className="mt-1 text-xs text-gray-400">
                                ✅ {stats.publishedCourses} Published | 📝 {stats.draftCourses} Drafts
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <p className="text-sm font-medium text-gray-400">Taxonomy</p>
                            <h3 className="mt-2 text-3xl font-bold text-blue-400">{stats.totalTags} Tags</h3>
                            <p className="mt-1 text-xs text-gray-400">📁 {stats.totalCategories} Categories available</p>
                        </div>
                    </div>

                    {/* Recent Lists */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <h3 className="text-lg font-bold">Recent Users</h3>
                            <div className="mt-4 divide-y divide-gray-700">
                                {recentUsers.map((u) => (
                                    <div key={u._id} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">{u.firstName} {u.lastName}</p>
                                            <p className="text-xs text-gray-400">{u.email}</p>
                                        </div>
                                        <span className="rounded-full bg-yellow-400/10 px-2.5 py-0.5 text-xs text-yellow-400 border border-yellow-400/20">
                                            {u.accountType}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                            <h3 className="text-lg font-bold">Recently Created Courses</h3>
                            <div className="mt-4 divide-y divide-gray-700">
                                {recentCourses.map((c) => (
                                    <div key={c._id} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">{c.courseName}</p>
                                            <p className="text-xs text-gray-400">By: {c.instructor?.firstName} {c.instructor?.lastName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-yellow-400">₹{c.price}</p>
                                            <span className={`text-xs ${c.status === "Published" ? "text-green-400" : "text-gray-400"}`}>
                                                {c.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: TAGS & CATEGORIES */}
            {activeTab === "tags_categories" && (
                <div className="mt-6 space-y-8">
                    {/* Create / Edit Tag Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                            <h2 className="text-lg font-bold mb-4">
                                {editingTag ? "✏️ Edit Tag" : "➕ Create New Tag"}
                            </h2>
                            <form onSubmit={handleTagSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Tag Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. React, Node, Web Dev"
                                        value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}
                                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Description (Optional)</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Brief tag description..."
                                        value={tagDesc}
                                        onChange={(e) => setTagDesc(e.target.value)}
                                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500"
                                    >
                                        {editingTag ? "Update Tag" : "Create Tag"}
                                    </button>
                                    {editingTag && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingTag(null);
                                                setTagName("");
                                                setTagDesc("");
                                            }}
                                            className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Tags Table */}
                            <h3 className="mt-8 text-md font-bold text-gray-300 mb-3">All Tags ({tags.length})</h3>
                            {tags.length === 0 ? (
                                <p className="text-sm text-gray-500">No tags created yet.</p>
                            ) : (
                                <div className="max-h-60 overflow-y-auto divide-y divide-gray-700">
                                    {tags.map((t) => (
                                        <div key={t._id} className="py-2.5 flex items-center justify-between">
                                            <div>
                                                <span className="font-semibold text-sm text-yellow-400">#{t.name}</span>
                                                {t.description && <p className="text-xs text-gray-400">{t.description}</p>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingTag(t);
                                                        setTagName(t.name);
                                                        setTagDesc(t.description || "");
                                                    }}
                                                    className="text-xs font-semibold text-blue-400 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTag(t._id)}
                                                    className="text-xs font-semibold text-red-400 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Create / Edit Category Section */}
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                            <h2 className="text-lg font-bold mb-4">
                                {editingCategory ? "✏️ Edit Category" : "📂 Create New Category"}
                            </h2>
                            <form onSubmit={handleCategorySubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Category Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Web Development, Data Science"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Description (Optional)</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Brief category description..."
                                        value={categoryDesc}
                                        onChange={(e) => setCategoryDesc(e.target.value)}
                                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500"
                                    >
                                        {editingCategory ? "Update Category" : "Create Category"}
                                    </button>
                                    {editingCategory && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingCategory(null);
                                                setCategoryName("");
                                                setCategoryDesc("");
                                            }}
                                            className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Categories Table */}
                            <h3 className="mt-8 text-md font-bold text-gray-300 mb-3">All Categories ({categories.length})</h3>
                            {categories.length === 0 ? (
                                <p className="text-sm text-gray-500">No categories created yet.</p>
                            ) : (
                                <div className="max-h-60 overflow-y-auto divide-y divide-gray-700">
                                    {categories.map((c) => (
                                        <div key={c._id} className="py-2.5 flex items-center justify-between">
                                            <div>
                                                <span className="font-semibold text-sm text-green-400">{c.name}</span>
                                                {c.description && <p className="text-xs text-gray-400">{c.description}</p>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingCategory(c);
                                                        setCategoryName(c.name);
                                                        setCategoryDesc(c.description || "");
                                                    }}
                                                    className="text-xs font-semibold text-blue-400 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(c._id)}
                                                    className="text-xs font-semibold text-red-400 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: USER MANAGEMENT */}
            {activeTab === "users" && (
                <div className="mt-6 rounded-2xl border border-gray-700 bg-gray-800 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-lg font-bold">User Directory ({users.length})</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Filter by role:</span>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm text-white outline-none"
                            >
                                <option value="">All Roles</option>
                                <option value="Student">Students</option>
                                <option value="Instructor">Instructors</option>
                                <option value="Admin">Admins</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-700 text-xs text-gray-400 uppercase bg-gray-900/50">
                                <tr>
                                    <th className="py-3 px-4">User</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Role</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-700/30">
                                        <td className="py-3 px-4 font-semibold">
                                            {u.firstName} {u.lastName}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300">{u.email}</td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={u.accountType}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                className="rounded bg-gray-700 px-2 py-1 text-xs text-yellow-400 font-semibold outline-none"
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Instructor">Instructor</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => handleDeleteUserAccount(u._id)}
                                                className="rounded border border-red-500/40 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 4: PLATFORM COURSES */}
            {activeTab === "courses" && (
                <div className="mt-6 rounded-2xl border border-gray-700 bg-gray-800 p-6">
                    <h2 className="text-lg font-bold mb-6">Platform Courses ({platformCourses.length})</h2>

                    {platformCourses.length === 0 ? (
                        <p className="text-gray-400">No courses created on platform yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {platformCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-700 bg-gray-900 p-4 sm:flex-row sm:items-center"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-20 w-32 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{course.courseName}</p>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    course.status === "Published"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-gray-600/40 text-gray-300"
                                                }`}
                                            >
                                                {course.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Instructor: {course.instructor?.firstName} {course.instructor?.lastName} ({course.instructor?.email})
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Category: {course.category?.name || "N/A"} | Tag: #{course.tag?.name || "N/A"}
                                        </p>
                                    </div>
                                    <div className="text-sm font-semibold text-yellow-400">
                                        ₹{course.price}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleCourseStatus(course._id, course.status)}
                                            className="rounded-lg border border-yellow-400/40 px-3 py-1.5 text-xs font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black"
                                        >
                                            {course.status === "Published" ? "Unpublish" : "Publish"}
                                        </button>
                                        <button
                                            onClick={() => handleDeletePlatformCourse(course._id)}
                                            className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
