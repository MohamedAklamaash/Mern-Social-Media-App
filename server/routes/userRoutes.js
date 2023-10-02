const express = require("express");
const router = express.Router();
const { createUser,loginUser, updateUser, deleteUser, getUserDetails, followUser, unfollowUser } = require("../controllers/usersController");

router.route("/createUser").post(createUser);
router.route("/loginUser").post(loginUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/getUserDetails/:id").get(getUserDetails);
router.route("/followUser/:id").put(followUser);
router.route("/unfollowUser/:id").put(unfollowUser);

module.exports = router;