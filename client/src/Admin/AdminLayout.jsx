import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu, MdDashboard } from "react-icons/md";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const { user } = useSelector((state) => state.user);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main content */}
            <div
                className={`
                    min-h-screen transition-all duration-300
                    ${collapsed ? "lg:ml-20" : "lg:ml-64"}
                `}
            >
                {/* Top header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                            aria-label="Open sidebar"
                        >
                            <MdMenu size={25} />
                        </button>

                        <div className="flex items-center gap-2">
                            <MdDashboard
                                size={22}
                                className="text-indigo-600"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">
                                Admin Dashboard
                            </h2>
                        </div>
                    </div>

                    {/* User Profile Section */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-800">
                                {user?.name || "Admin User"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email || "admin@example.com"}
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 shadow-inner">
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "A"}
                        </div>
                    </div>
                </header>

                {/* Nested page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
