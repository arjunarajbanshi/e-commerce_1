import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
    loginUser,
    removeErrors,
    removeSuccess,
} from "../features/user/userSlice";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const { error, loading, success, isAuthenticated } = useSelector(
        (state) => state.user,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const redirect = "/";
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const loginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast.error("All fields are required!");
            return;
        }

        dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(`Login successfull`);
            dispatch(removeSuccess());
            if (isAuthenticated) navigate(redirect);
        }
    }, [dispatch, success, isAuthenticated]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label className="sr-only" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Password Input with Show/Hide Toggle */}
                        <div>
                            <label className="sr-only" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                    }
                                    className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5" />
                                    ) : (
                                        <FiEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-end">
                        <Link
                            to="/password/forgot"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    {/* Register redirect */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
