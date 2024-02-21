import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";

const router = express.Router();

//we will use controller
// router.get("/profile/:username", (req, res) => {
//   res.send("user profile is ready");
// });

router.get("/profile/:username", getUserProfileAndRepos);

//TODO -> GET likes
//TODO -> POST  like a profile

export default router;
