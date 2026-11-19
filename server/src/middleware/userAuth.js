import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new errorHandler(401, "Authentication is missing! Please login to access resource"))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decodedData.id)

    next()

})

/* Role Based Access Control - RBAC */
export const authorized = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) return next(new errorHandler(403, `Role - ${req.user.role} is not allowed to access the resource`));

        next()
    }
}

