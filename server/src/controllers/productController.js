import Product from "../models/productModel.js"
import handleAsyncError from "../middleware/handleAsyncError.js";
import errorHandler from "../utils/errorHandler.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary"

export const createProduct = handleAsyncError(async (req, res, next) => {
    if (req.body.image) {
        let image = []

        if (typeof req.body.image === 'string') {
            image.push(req.body.image)
        } else {
            image = req.body.image
        }

        const imageLinks = []
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i], { folder: 'products' })
            imageLinks.push({
                public_id: result.public_id,
                image_url: result.secure_url
            })
        }

        req.body.image = imageLinks
    }
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

export const getAllProducts = handleAsyncError(async (req, res, next) => {

    const resultPerPage = 6;

    const apiFeatures = new APIFunctionality(Product.find(), req.query)
        .search()
        .filter()

    // Getting filtered query before pagination | not showng pagination if results < resultPerPage
    const filteredQuery = apiFeatures.query.clone();
    const productCount = await filteredQuery.countDocuments();

    // Calculate totalPages based on filtered count
    const totalPages = Math.ceil(productCount / resultPerPage);
    const page = Number(req.query.page) || 1;

    if (page > totalPages && productCount > 0) return next(new errorHandler(404, "This page doesn't exists"))

    // Apply pagination
    apiFeatures.pagination(resultPerPage);


    // console.log(apiFunctionality);

    /* instancee.query has query model operation to perform action */
    const products = await apiFeatures.query;

    if (!products || products.length === 0) return next(new errorHandler(404, "Product not found"))

    res.status(200).json({
        success: true,
        productCount,
        resultPerPage,
        totalPages,
        currentPage: page,
        products
    })

})

export const getOneProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new errorHandler(404, "Product not found"))

    res.status(200).json({
        success: true,
        product
    })
})

export const updateProduct = handleAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) return next(new errorHandler(404, "Product not found"))

    /* Image is optional */
    if (req.body.image) {
        let images = []

        if (typeof req.body.image === 'string') {
            images.push(req.body.image)
        } else if (Array.isArray(req.body.image)) {
            images = req.body.image
        }

        if (images.length > 0) {
            for (let i = 0; i < product.image.length; i++) {
                await cloudinary.uploader.destroy(product.image[i].public_id)
            }

            const imageLinks = []
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(images[i], { folder: 'products' })
                imageLinks.push({
                    public_id: result.public_id,
                    image_url: result.secure_url
                })
            }

            req.body.image = imageLinks
        }
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    })
})

export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new errorHandler(404, "Product not found"))

    if (product.image.length > 0) {
        for (let i = 0; i < product.image.length; i++) {
            await cloudinary.uploader.destroy(product.image[i].public_id)
        }
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully!"
    })

    // res.sendStatus(204);
})

// Create and update reviews
export const createProductReview = handleAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return next(new errorHandler(404, `No product found`));

    /* array.find() */
    const reviewExists = product.reviews.find(
        review => review.user.equals(req.user._id) // Mongoose ObjectId Comparison
    );

    if (reviewExists) {
        reviewExists.rating = Number(rating);
        reviewExists.comment = comment;
    } else {
        product.reviews.push({
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        });
    }
    product.numOfReviews = product.reviews.length;

    let sum = 0;
    product.reviews.forEach(review => {
        sum += review.rating;
    })

    product.ratings = product.reviews.length > 0 ? Number((sum / product.numOfReviews).toFixed(1)) : 0;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, product });
});

export const getProductReviews = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) return next(new errorHandler(404, `Product not found`));

    res.status(200).json({ success: true, reviews: product.reviews })
})

export const deleteReview = handleAsyncError(async (req, res, next) => {
    const { reviewId, productId } = req.query;

    // console.log(req.user._id);

    const product = await Product.findById(productId);

    if (!product) return next(new errorHandler(404, `Product not found`));

    /* no mongoose method as partially removing some part of document  */
    const reviews = product.reviews.filter(review => review._id.toString() !== reviewId.toString());

    let sum = 0;

    reviews.forEach(review => {
        sum += review.rating
    })

    const ratings = reviews.length > 0 ? sum / reviews.length : 0;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(productId, { reviews, ratings, numOfReviews }, { new: true, runValidators: true });

    res.status(200).json({ success: true, message: 'Deleted successfully!' })
})

/* ADMIN */
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products })
})


/* understanding
adding next or 3rd param makes it middleware.
    - we call next() and inside it new instance of errorHandler class is created with statuscode and message passed as args and next() calls next middleware in the stack.
*/

