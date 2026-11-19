import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required!']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required!'],
        MaxLength: [7, "Price can't exceed 7 digits"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                // required: true
            },
            image_url: {
                type: String,
                // required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Product category is required!']
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required!"],
        MaxLength: [5, "Product stock cann't exceed 5"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
