import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    adminDeleteProduct,
    adminFetchAllUsers,
    removeErrors,
} from "../features/admin/adminSlice";

const UsersList = () => {
    const { loading, error, users, deletingId } = useSelector(
        (state) => state.admin,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminFetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(adminDeleteProduct(id))
                .unwrap()
                .then(() => {
                    toast.success("User deleted successfully!");
                })
                .catch((err) => {
                    toast.error(err?.message || "Failed to delete user");
                });
        }
    };

    if (loading && users.length === 0) return <Loader />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <PageTitle title="All Users | Admin" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="py-4 px-4">SN. No.</th>
                                <th className="py-4 px-4">Name</th>
                                <th className="py-4 px-4">Email</th>
                                <th className="py-4 px-4">Role</th>
                                <th className="py-4 px-4">Created At</th>
                                <th className="py-4 px-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                            {[...users]
                                .sort(
                                    (a, b) =>
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt),
                                )
                                .map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50/50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4 capitalize">
                                            {user.role}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                                            {new Date(
                                                user.createdAt,
                                            ).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link
                                                    to={`/admin/users/${user._id}`}
                                                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <MdEdit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                    disabled={
                                                        deletingId === user._id
                                                    }
                                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deletingId === user._id ? (
                                                        <span className="text-xs font-medium">
                                                            Deleting...
                                                        </span>
                                                    ) : (
                                                        <FaTrash size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
