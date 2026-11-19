import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
    forgotPassword,
    removeErrors,
    removeSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
    const { loading, error, success, message } = useSelector(
        (state) => state.user,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) return toast.error("Email is required!");

        const userData = new FormData();
        userData.set("email", email);
        dispatch(forgotPassword(userData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(message || "Reset password link sent successfully");
            dispatch(removeSuccess());
            navigate("/profile");
        }
    }, [dispatch, success, message, navigate]);

    return (
        <>
            <PageTitle title="Forgot Password" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Forgot Password
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Enter your registered email address and we'll send
                            you instructions to reset your password.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <AiOutlineMail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    placeholder="Enter your registered email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send Link"}
                            </button>
                            <Link
                                to="/profile"
                                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
