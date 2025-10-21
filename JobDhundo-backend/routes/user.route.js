import express from "express";
import {
  register,
  updateProfile,
  login,
} from "../Controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { logout } from "../Controllers/user.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router
  .route("/profile/update")
  .put(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);

export default router;
