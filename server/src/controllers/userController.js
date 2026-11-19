import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';
import { v2 as cloudinary } from "cloudinary";

export const oldregisterUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;

    // in frotend using FileReader to covert file to string. so avatar is in req.body 

    const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: 'avatars',
        width: 200,
        height: 200,
        crop: 'scale'
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    /* refactoring repeated code
        const token = user.getJWT();
    
        res.status(201).json({
            success: true,
            user,
            token
        })
    */
    sendToken(user, 201, res); // res object
})

export const registerUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});

export const loginUser = handleAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new errorHandler(400, "Email or password missing!"));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new errorHandler(400, "Invalid credentials"));

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) return next(new errorHandler(401, "Invalid credentials"));

    sendToken(user, 200, res);
})

export const logout = handleAsyncError(async (req, res, next) => {

    /* cookie('name', value, [options]) */
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: false,
        message: "Logout successfully"
    })
})

export const forgotPassword = handleAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new errorHandler(404, "User doesn't found"));

    let resetToken;

    try {
        resetToken = await user.genPasswdResetToken();
        await user.save({ validateBeforeSave: false })

    } catch (error) {
        console.log(error);

        return next(new errorHandler(500, "Could not save reset token, please try again later."));
    }

    const resetPasswordURL = `${req.protocol}://${req.get('host')}/reset/${resetToken}`;

    // req.protocol = https http

    const message = `Use the following link to reset your password: ${resetPasswordURL} \n\nThis link will expire in 5 minutes. \n\nIf you didn't request a password reset, please ignore this message.`;

    try {
        /* Send Email */
        await sendEmail({ email: user.email, subject: 'Password reset request', message });

        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        console.log(error);

        return next(new errorHandler(500, "Email couldn't be send, please try later."));
    }
})

export const resetPassword = handleAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

    if (!user) return next(new errorHandler(400, 'Token invalid or has been expired'));


    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) return next(new errorHandler(400, 'Password do not matched'));

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
})

export const getUserDetails = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
})

export const updateUserPassword = handleAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    const checkPasswordMatch = await user.verifyPassword(oldPassword);

    if (!checkPasswordMatch) return next(new errorHandler(400, 'Old password is incorrect'));

    if (newPassword !== confirmPassword) return next(new errorHandler(400, "Password doesn't match"));

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res)
})

export const updateProfile = handleAsyncError(async (req, res, next) => {
    const { name, email, avatar } = req.body;

    const updateUserDetails = { name, email };

    // If a new avatar string/image is provided during update
    if (avatar) {
        const user = await User.findById(req.user.id);

        // Optional: Destroy old avatar from cloudinary if it exists
        if (user.avatar && user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: 'avatars',
            width: 200,
            height: 200,
            crop: 'scale',
        });

        updateUserDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser
    });
});

/* ADMIN */
export const adminGetAllUsers = handleAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users })
})

export const adminGetUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new errorHandler(404, `User not found with this id: ${req.params.id}`));

    res.status(200).json({ success: true, user })
})

export const adminAlterRole = handleAsyncError(async (req, res, next) => {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });

    if (!user) return next(new errorHandler(404, `User not found with this id: ${req.params.id}`));

    res.status(200).json({ success: true, user })
})

export const adminDeleteUser = handleAsyncError(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return next(new errorHandler(404, `User not found with this id: ${req.params.id}`));

    res.status(200).json({ success: true, message: 'User deleted successfully!' })
})

