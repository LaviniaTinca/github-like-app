import express from "express";
import {
  getUserProfileAndRepos,
  likeProfile,
  getLikes,
} from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

//we will use controller
// router.get("/profile/:username", (req, res) => {
//   res.send("user profile is ready");
// });

router.get("/profile/:username", getUserProfileAndRepos);

router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;
