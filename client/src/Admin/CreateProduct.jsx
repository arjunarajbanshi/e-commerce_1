import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import {
    adminCreateProduct,
    removeErrors,
    removeSuccess,
} from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const { createProductSuccess, loading, error } = useSelector(
        (state) => state.admin,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = [
        "men",
        "women",
        "kids",
        "electronics",
        "accessories",
        "shoes",
    ];

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const handleCreateProduct = (e) => {
        e.preventDefault();

        const productData = new FormData();
        productData.set("name", name);
        productData.set("price", price);
        productData.set("description", description);
        productData.set("category", category);
        productData.set("stock", stock);

        image.forEach((img) => {
            productData.append("image", img);
        });

        dispatch(adminCreateProduct(productData));
    };

    const handleCreateProductImage = (e) => {
        const files = Array.from(e.target.files);

        setImage([]);
        setImagePreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage((old) => [...old, reader.result]);
                    setImagePreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (createProductSuccess) {
            toast.success("Product Created Successfully");

            dispatch(removeSuccess());

            // Reset form
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            setImage([]);
            setImagePreview([]);

            navigate("/admin/products");
        }

        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [createProductSuccess, error, dispatch, navigate]);

    return (
        <>
            <PageTitle title="Admin | Create Product" />
            <div className="max-w-full mx-auto">
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                        Create New Product
                    </h1>

                    <form
                        encType="multipart/form-data"
                        onSubmit={handleCreateProduct}
                        className="space-y-5"
                    >
                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Product Price"
                                name="price"
                                required
                                value={price}
                                min={0}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                placeholder="Enter Product Description"
                                name="description"
                                required
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Category & Stock (Grid layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Category
                                </label>
                                <select
                                    required
                                    name="category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" disabled>
                                        Choose Category
                                    </option>
                                    {categories.map((i) => (
                                        <option key={i} value={i}>
                                            {i.charAt(0).toUpperCase() +
                                                i.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter Product Stock"
                                    required
                                    name="stock"
                                    value={stock}
                                    min={0}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Product Images
                            </label>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleCreateProductImage}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-150 cursor-pointer"
                            />
                        </div>

                        {/* Image Preview */}
                        {imagePreview.length > 0 && (
                            <div>
                                <span className="block text-gray-700 text-sm font-semibold mb-2">
                                    Previews ({imagePreview.length})
                                </span>
                                <div className="flex flex-wrap gap-3">
                                    {imagePreview.map((img, index) => (
                                        <img
                                            src={img}
                                            alt="Product Preview"
                                            key={index}
                                            className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading
                                    ? "Creating product..."
                                    : "Create Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;
