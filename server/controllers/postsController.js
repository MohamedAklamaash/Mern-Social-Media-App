const postSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const createPost = async (req, res) => {
  try {
    const post = await postSchema.create(req.body);
    await post.save();
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error in creating the post");
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      await post.save();
      return res.status(200).json({ success: true, post });
    } else {
      res.status(403).json({ msg: "You can only update your Profile" });
    }
  } catch (error) {
    console.log("error in updating the post");
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postSchema.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(500).json({ success: false });
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error in deleting the post");
  }
};

const likeOrDislikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await postSchema.findById(req.params.id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      await post.save();
      const userDetails = await userSchema.findById(userId);
      return res
        .status(200)
        .json({ success: true, userName: userDetails.userName });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      await post.save();
      return res
        .status(200)
        .json({ success: false, msg: "You removed your like" });
    }
  } catch (error) {
    console.log("Error in liking the post");
    return res.json({ success: false });
  }
};

const getPostDetails = async (req, res) => {
  const post = await postSchema.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, msg: "Post not Found" });
  }
  return res.status(201).json({ post });
};

const getPosts = async (req, res) => {
  const currentUser = await userSchema.findById(req.params.id);
  if (!currentUser) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }
  const Userposts = await postSchema.find({ userId: currentUser._id });
  const friendsPost = await Promise.all(
    currentUser.followings.map((friendId) => {
      return postSchema.find({ userId: friendId });
    })
  );
  return res.status(201).send(Userposts.concat(...friendsPost));
};

const getUsersPosts = async (req, res) => {
  try {
    const currentUser = await userSchema.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const Userposts = await postSchema.find({ userId: currentUser._id });
    return res.status(200).json({ posts: Userposts });
  } catch (error) {
    console.log("Error in getting user details page");
  }
};

const postComments = async (req, res) => {
  const postId = req.params.id;
  const { userId, comments } = req.body;
  const user = await userSchema.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false });
  }
  const post = await postSchema.findById(postId);
  await post.updateOne({ $push: { comments } });
  await post.updateOne({$push:{comments:{userName:user.userName}}});
  await post.save();
  return res.status(200).json({ success: true ,user });
};

const getAllCommentsOfPost = async (req, res) => {
  const postId = req.params.id;
  const post = await postSchema.findById(postId);
  return res.status(200).json({ comments: post.comments });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeOrDislikePost,
  getPostDetails,
  getPosts,
  getUsersPosts,
  getAllCommentsOfPost,
  postComments,
};
