import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    removeErrors,
    removeSuccess,
    resetPassword,
} from "../features/user/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // States for show/hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword)
            return toast.error("All fields are required!");

        const userData = { password, confirmPassword, token };

        dispatch(resetPassword({ token, userData }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success("Password reset successfully");
            dispatch(removeSuccess());
            navigate("/login");
        }
    }, [dispatch, success, navigate]);

    return (
        <>
            <PageTitle title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please enter your new password below.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleResetPassword}
                    >
                        <div className="space-y-4">
                            {/* New Password Field */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash size={18} />
                                    ) : (
                                        <FaEye size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash size={18} />
                                    ) : (
                                        <FaEye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            >
                                Reset Password
                            </button>
                        </div>

                        {/* Back to Login Link */}
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                &larr; Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
