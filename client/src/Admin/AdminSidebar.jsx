import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
    MdDashboard,
    MdInventory,
    MdAddBox,
    MdPeople,
    MdShoppingCart,
    MdStar,
    MdChevronLeft,
    MdChevronRight,
    MdClose,
    MdHome,
} from "react-icons/md";

const AdminSidebar = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}) => {
    const navGroups = [
        {
            title: "Products",
            links: [
                {
                    name: "All Products",
                    path: "/admin/products",
                    icon: MdInventory,
                },
                {
                    name: "Create Product",
                    path: "/admin/products/create",
                    icon: MdAddBox,
                }
            ],
        },
        {
            title: "Users",
            links: [
                {
                    name: "All Users",
                    path: "/admin/users",
                    icon: MdPeople,
                },
            ],
        },
        {
            title: "Orders",
            links: [
                {
                    name: "All Orders",
                    path: "/admin/orders",
                    icon: MdShoppingCart,
                },
            ],
        },
        {
            title: "Reviews",
            links: [
                {
                    name: "All Reviews",
                    path: "/admin/reviewId",
                    icon: MdStar,
                },
            ],
        },
    ];

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${
            isActive
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`;

    return (
        <>
            {/* Mobile backdrop */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex flex-col
                    bg-gray-950 text-white border-r border-gray-800
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "w-20" : "w-64"}
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-gray-800 px-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600">
                            <Link to="/">
                                <MdDashboard size={24} />
                            </Link>
                        </div>

                        {!collapsed && (
                            <span className="whitespace-nowrap text-lg font-bold">
                                Admin Panel
                            </span>
                        )}
                    </div>

                    {/* Mobile close */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <MdClose size={22} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
                    <div>
                        {!collapsed && (
                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Overview
                            </p>
                        )}

                        <NavLink
                            to="/admin/overview"
                            end
                            onClick={() => setMobileOpen(false)}
                            title={collapsed ? "Overview" : ""}
                            className={linkClasses}
                        >
                            <MdHome size={21} className="shrink-0" />
                            {!collapsed && <span>Overview</span>}
                        </NavLink>
                    </div>

                    {navGroups.map((group) => (
                        <div key={group.title}>
                            {!collapsed && (
                                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    {group.title}
                                </p>
                            )}

                            <div className="space-y-1">
                                {group.links.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            end // URL must match complete path
                                            onClick={() => setMobileOpen(false)}
                                            title={collapsed ? link.name : ""}
                                            className={linkClasses}
                                        >
                                            <Icon
                                                size={21}
                                                className="shrink-0"
                                            />
                                            {!collapsed && (
                                                <span className="whitespace-nowrap">
                                                    {link.name}
                                                </span>
                                            )}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Collapse button - desktop only */}
                <div className="hidden border-t border-gray-800 p-3 lg:block">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        aria-label={
                            collapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                    >
                        {collapsed ? (
                            <MdChevronRight size={22} />
                        ) : (
                            <>
                                <MdChevronLeft size={22} />
                                <span className="text-sm">
                                    Collapse Sidebar
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
