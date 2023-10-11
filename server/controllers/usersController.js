const userSchema = require("../models/userSchema");
const bcrpypt = require("bcryptjs");
const ApiFeatures = require("../features/ApiFeatures");
const createUser = async (req, res) => {
  const { userName, password, email, profilePicture } = req.body;
  const user = await userSchema.create({
    profilePicture,
    userName,
    password,
    email,
  });
  if (!user) {
    return res.status(500).json({ success: false });
  }
  await user.save();
  return res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(500).json({ success: false });
    }
    const validPass = await bcrpypt.compare(password, user.password);
    if (!validPass) {
      return res.status(500).json({ success: false });
    }
    return res.status(201).json({ user });
  } catch (error) {
    console.log("error in login user section");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(500).json({ success: false });
    }
    const updateUser = await userSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    await updateUser.save();
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error in updating of users section");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error in deleting section of the user");
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(500).json({ success: false });
    }
    const { password, updatedAt, ...other } = user._doc;
    return res.status(201).json({ other });
  } catch (error) {
    console.log("Error in get User details section");
  }
};

const followUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUser = await userSchema.findById(userId);
    const userThatThecurrUserisGoingToFollow = await userSchema.findById(
      req.params.id
    );
    if (userId === req.params.id) {
      return res
        .status(403)
        .json({ success: false, msg: "You can't follow yourself" });
    }
    if (!userThatThecurrUserisGoingToFollow.followers.includes(userId)) {
      await userThatThecurrUserisGoingToFollow.updateOne({
        $push: { followers: userId },
      });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      return res.status(201).json({
        success: true,
        msg: ` This ${userId} is following this ${req.params.id} userId`,
      });
    }
  } catch (error) {}
};

const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUser = await userSchema.findById(userId);
    const userToUnfollow = await userSchema.findById(req.params.id);

    if (!currentUser || !userToUnfollow) {
      return res.status(403).json({ success: false, msg: "User not found" });
    }

    if (userId === req.params.id) {
      return res
        .status(403)
        .json({ success: false, msg: "You can't unfollow yourself" });
    }

    if (currentUser.followings.includes(req.params.id)) {
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      await userToUnfollow.updateOne({ $pull: { followers: userId } });
      return res.status(201).json({
        success: true,
        msg: `${userId} unfollowed ${req.params.id}`,
      });
    }
    return res
      .status(403)
      .json({ success: false, msg: "You are not following this user" });
  } catch (error) {
    console.error("Error in unfollow user section:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getSearchResults = async (req, res) => {
  const apiFeature = new ApiFeatures(userSchema.find(), req.query).search();
  const details = await apiFeature.query;
  if (!details) {
    return res.json({ success: false });
  }
  res.json({ details });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserDetails,
  followUser,
  unfollowUser,
  getSearchResults
};
