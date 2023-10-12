const express = require("express");
const { createPost, updatePost, deletePost,likeOrDislikePost, getPostDetails, getPosts, getUsersPosts } = require("../controllers/postsController");
const router = express.Router();

router.route("/createPost").post(createPost);
router.route("/updatePost/:id").put(updatePost);
router.route("/deletePost/:id").delete(deletePost);
router.route("/like/:id").put(likeOrDislikePost);
router.route("/getPostDetails/:id").get(getPostDetails);
router.route("/getAllPosts/:id").get(getPosts);
router.route("/getuserPosts/:id").get(getUsersPosts);

module.exports = router;