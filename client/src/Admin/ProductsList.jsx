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
    adminFetchAllProducts,
    removeErrors,
} from "../features/admin/adminSlice";

const ProductsList = () => {
    const { loading, error, products, deletingId } = useSelector(
        (state) => state.admin,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminFetchAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(adminDeleteProduct(id))
                .unwrap()
                .then(() => {
                    toast.success("Product deleted successfully!");
                })
                .catch((err) => {
                    toast.error(err?.message || "Failed to delete product");
                });
        }
    };

    if (loading && products.length === 0) return <Loader />;

    if (!products || products.length === 0) {
        return (
            <div className="max-w-full mx-auto">
                <PageTitle title="All Products" />
                <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Admin Products
                    </h1>
                    <p className="text-gray-500 mb-6">No products found</p>
                    <Link
                        to="/admin/products/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                        Create Product
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <PageTitle title="All Products" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    All Products
                </h1>
                <Link
                    to="/admin/products/create"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                    Create Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="py-4 px-4">SN. No.</th>
                                <th className="py-4 px-4">Image</th>
                                <th className="py-4 px-4">Name</th>
                                <th className="py-4 px-4">Price</th>
                                <th className="py-4 px-4">Ratings</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4">Stock</th>
                                <th className="py-4 px-4">Created At</th>
                                <th className="py-4 px-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                            {[...products]
                                .sort(
                                    (a, b) =>
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt),
                                )
                                .map((product, index) => (
                                    <tr
                                        key={product._id}
                                        className="hover:bg-gray-50/50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={
                                                    product.image?.[0]
                                                        ?.image_url ||
                                                    "/images/no-image.png"
                                                }
                                                alt={product.name}
                                                className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                                            />
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            ${product.price}
                                        </td>
                                        <td className="py-3 px-4">
                                            {product.ratings ||
                                                product.raings ||
                                                0}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                    product.stock > 0
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-700"
                                                }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                                            {new Date(
                                                product.createdAt,
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
                                                    to={`/admin/products/${product._id}`}
                                                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <MdEdit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id,
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        product._id
                                                    }
                                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deletingId ===
                                                    product._id ? (
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

export default ProductsList;
