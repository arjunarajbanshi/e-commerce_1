
import PageTitle from "../components/PageTitle";
import {
    MdInventory,
    MdPeople,
    MdShoppingCart,
    MdStar,
    MdAttachMoney,
    MdError,
    MdCheckCircle,
} from "react-icons/md";
import {
    FaInstagramSquare,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";

const DashboardHome = () => {
    const stats = [
        {
            title: "Total Products",
            value: "4",
            icon: MdInventory,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Orders",
            value: "4",
            icon: MdShoppingCart,
            color: "bg-purple-100 text-purple-600",
        },
        {
            title: "Total Reviews",
            value: "4",
            icon: MdStar,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Total Users",
            value: "4",
            icon: MdPeople,
            color: "bg-indigo-100 text-indigo-600",
        },
        {
            title: "Total Revenue",
            value: "Rs. 4,023",
            icon: MdAttachMoney,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Out of Stock",
            value: "4",
            icon: MdError,
            color: "bg-red-100 text-red-600",
        },
        {
            title: "In Stock",
            value: "4",
            icon: MdCheckCircle,
            color: "bg-emerald-100 text-emerald-600",
        },
    ];

    const socials = [
        {
            name: "Instagram",
            followers: "12K Followers",
            posts: "22 Posts",
            icon: FaInstagramSquare,
            color: "text-pink-600",
        },
        {
            name: "LinkedIn",
            followers: "8K Followers",
            posts: "22 Posts",
            icon: FaLinkedin,
            color: "text-blue-700",
        },
        {
            name: "YouTube",
            followers: "8K Subscribers",
            posts: "10 Videos",
            icon: FaYoutube,
            color: "text-red-600",
        },
    ];

    return (
        <>
            <PageTitle title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Page heading */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening with your store.
                    </p>
                </div>

                {/* Statistics */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Store Statistics
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                {stat.title}
                                            </p>

                                            <h3 className="mt-2 text-2xl font-bold text-gray-800">
                                                {stat.value}
                                            </h3>
                                        </div>

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                                        >
                                            <Icon size={25} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Social media */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Social Media Overview
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {socials.map((social) => {
                            const Icon = social.icon;

                            return (
                                <div
                                    key={social.name}
                                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon
                                            size={42}
                                            className={social.color}
                                        />

                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {social.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {social.followers}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-gray-100 pt-4">
                                        <p className="text-sm text-gray-500">
                                            {social.posts}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
};

export default DashboardHome;
