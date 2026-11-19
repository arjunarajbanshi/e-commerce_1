import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import validator from "validator"
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [25, "Name must be less than 26 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},
    {
        timestamps: true
    }
)

/* hash password */
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

/* JWT sign */
userSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
}

/* Verify password */
userSchema.methods.verifyPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
}

/* Generate token */
userSchema.methods.genPasswdResetToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    /* save hash of resetToken in DB */
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    /* 1K milisec = 1 sec */
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 mins

    return resetToken;
}


/* Create model */
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;


/* hass password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next(); // <-- CRITICAL: You must call next() here to proceed with the save operation
    } catch (error) {
        next(error); // Passes any hashing error directly to Mongoose
    }
});
*/