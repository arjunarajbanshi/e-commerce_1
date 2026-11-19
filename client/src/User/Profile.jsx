import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import { toast } from "react-toastify";
import {
    loadUser,
    logoutUser,
    removeErrors,
    removeSuccess,
    updateProfile,
} from "../features/user/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const { user, error, success, message, loading, isAuthenticated } =
        useSelector((state) => state.user);

    // Edit profile mode toggle & form states
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/default-profile.jpg");

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, user]);

    // Populate local form fields when user data is available
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setAvatarPreview(user?.avatar?.url || "/default-avatar.png");
        }
    }, [user]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Handle API responses (errors and success messages)
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success(message || "Profile updated successfully");
            dispatch(loadUser());
            dispatch(removeSuccess());
            setIsEditing(false);
        }
    }, [error, success, message, dispatch]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success("Logged out successfully");
            dispatch(removeSuccess());
            navigate("/login");
        } catch (err) {
            toast.error(err?.message || err || "Logout failed");
            dispatch(removeErrors());
        }
    };

    // FileReader logic to preview and store image file
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    // Submit profile update using FormData
    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        if (avatar) {
            formData.set("avatar", avatar);
        }

        dispatch(updateProfile(formData));
    };

    if (loading && !user) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <PageTitle title={`${user?.name || "User"}'s Profile`} />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Top Navigation Bar */}
                <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                        <span className="mr-2">←</span> Home
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all duration-200"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {!isEditing ? (
                        <>
                            {/* Header Banner & Avatar */}
                            <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative">
                                    <img
                                        src={
                                            user?.avatar?.image_url ||
                                            "/images/default-profile.jpg"
                                        }
                                        alt={user?.name || "Profile picture"}
                                        className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-100 shadow-md"
                                    />
                                    <span
                                        className="absolute bottom-0 right-0 block w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white"
                                        title="Active"
                                    ></span>
                                </div>

                                <div className="text-center sm:text-left flex-1">
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                        {user?.name}
                                    </h1>
                                    <p className="text-sm text-slate-500 mt-0.5">
                                        {user?.email}
                                    </p>
                                    <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                                        >
                                            Edit Profile
                                        </button>
                                        <Link
                                            to="/password/update"
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all border border-slate-200"
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="p-6 sm:p-8 divide-y divide-slate-100">
                                <div className="py-4 first:pt-0 flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">
                                        Full Name
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {user?.name}
                                    </span>
                                </div>
                                <div className="py-4 flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">
                                        Email Address
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {user?.email}
                                    </span>
                                </div>
                                <div className="py-4 last:pb-0 flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">
                                        Member Since
                                    </span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {user?.createdAt
                                            ? new Date(
                                                  user.createdAt,
                                              ).toLocaleDateString(undefined, {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                              })
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Edit Form */
                        <form
                            onSubmit={handleUpdateSubmit}
                            className="p-6 sm:p-8 space-y-6"
                        >
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Edit Profile
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Avatar Upload with FileReader Preview */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-200 shadow-sm"
                                />
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
                                >
                                    {loading ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Footer Actions */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs text-slate-400">
                            Manage account activity
                        </span>
                        <Link
                            to="/orders/user"
                            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            View My Orders →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
