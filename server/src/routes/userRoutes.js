import { Router } from 'express';
import { adminAlterRole, adminDeleteUser, adminGetAllUsers, adminGetUser, forgotPassword, getUserDetails, loginUser, logout, registerUser, resetPassword, updateProfile, updateUserPassword } from '../controllers/userController.js';
import { authorized, verifyUserAuth } from '../middleware/userAuth.js';

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout) /* POST is required for Cookie-based Auth */
router.route("/password/forgot").post(forgotPassword)
router.route("/reset/:token").patch(resetPassword)
router.route("/profile").get(verifyUserAuth, getUserDetails)
router.route("/password/update").patch(verifyUserAuth, updateUserPassword)
router.route("/profile/update").patch(verifyUserAuth, updateProfile)

/* ADMIN */
router.route("/admin/users").get(verifyUserAuth, authorized('admin'), adminGetAllUsers)

router.route("/admin/users/:id")
    .get(verifyUserAuth, authorized('admin'), adminGetUser)
    .patch(verifyUserAuth, authorized('admin'), adminAlterRole)
    .delete(verifyUserAuth, authorized('admin'), adminDeleteUser)

export default router;