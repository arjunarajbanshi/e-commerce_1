import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {
    MdErrorOutline,
    MdArrowBack,
    MdHome,
    MdOutlineSearch,
} from "react-icons/md";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50/40 to-blue-50 flex items-center justify-center px-4 py-12">
            <PageTitle title="404 - Page Not Found" />

            {/* Background Decorations */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

            {/* Main Content */}
            <div className="relative w-full max-w-lg">
                <div className="bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-indigo-100/50 rounded-3xl px-7 py-12 sm:px-12 text-center">
                    {/* Error Icon */}
                    <div className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 bg-rose-100 rounded-3xl rotate-12 opacity-60" />

                        <div className="relative w-20 h-20 flex items-center justify-center bg-linear-to-br from-rose-500 to-red-600 text-white rounded-3xl shadow-lg shadow-rose-200">
                            <MdErrorOutline className="text-5xl" />
                        </div>
                    </div>

                    {/* Error Code */}
                    <div className="mb-2">
                        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            404
                        </h1>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                        Oops! Page not found
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm mx-auto">
                        The page you're looking for doesn't exist or may have
                        been moved. Don't worry, let's get you back on track.
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-1 bg-indigo-100 rounded-full mx-auto my-8" />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 cursor-pointer"
                        >
                            <MdArrowBack className="text-xl" />
                            Go Back
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-semibold py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <MdHome className="text-xl" />
                            Home
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
                        <MdOutlineSearch className="text-base" />
                        Check the URL or try navigating to another page.
                    </p>
                </div>

                {/* Bottom Branding */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    © {new Date().getFullYear()} · Something went wrong, but we
                    can fix it.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
