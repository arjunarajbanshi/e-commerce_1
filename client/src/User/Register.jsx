import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
    registerUser,
    removeErrors,
    removeSuccess,
} from "../features/user/userSlice";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const { name, email, password } = user;
    const { success, loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill out all the required fields");
            return;
        }

        // Send normal JSON payload instead of FormData since no file is uploaded here
        dispatch(registerUser({ name, email, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(`Registration successful`);
            dispatch(removeSuccess());
            navigate("/login");
        }
    }, [dispatch, success, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us today! Enter your details below.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={registerSubmit}>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="sr-only" htmlFor="name">
                                Username
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Username"
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="sr-only" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                name="email"
                                value={email}
                                onChange={registerDataChange}
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
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
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

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Signup"}
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
