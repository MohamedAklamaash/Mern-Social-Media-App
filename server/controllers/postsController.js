const postSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const createPost = async(req,res)=>{
    try {
        const post = await postSchema.create(req.body);
        await post.save();
        return res.status(201).json({success:true});
    } catch (error) {
        console.log("Error in creating the post");
    }
}

const updatePost = async(req,res)=>{
    try {
        const post = await postSchema.findById(req.params.id);
        if(post.userId === req.body.userId)
        {
            await post.updateOne({$set:req.body});
            await post.save();
            return res.status(200).json({success:true,post});
        }   
        else{
            res.status(403).json({msg:"You can only update your Profile"})
        }
    } catch (error) {
        console.log("error in updating the post");
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = await postSchema.findByIdAndDelete(req.params.id);
        if(!post)
        {
            return res.status(500).json({success:false})
        }
        return res.status(201).json({success:true});
    } catch (error) {
        console.log("Error in deleting the post")
    }
}

const likeOrDislikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await postSchema.findById(req.params.id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      await post.save();
      return res
        .status(200)
        .json({ success: true, msg: "This post has been liked!" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      await post.save();
      return res
        .status(200)
        .json({ success: true, msg: "You removed your like" });
    }
  } catch (error) {
    console.log("Error in liking the post");
  }
};

const getPostDetails = async(req,res)=>{
    const post = await postSchema.findById(req.params.id);
    if(!post){
        return res.status(404).json({success:false,msg:"Post not Found"})
    }
    return res.status(201).json({post})
}

const getPosts = async(req,res)=>{
    const currentUser = await userSchema.findById(req.params.id);
    if(!currentUser)
    {
        return res.status(404).json({success:false,msg:"User not found"});
    }
    const Userposts = await postSchema.find({userId:currentUser._id});
    const friendsPost = await Promise.all(currentUser.followings.map((friendId)=>{
        return postSchema.find({userId:friendId});
    }))
    return res.status(201).send(Userposts.concat(...friendsPost));
}

module.exports = {createPost,updatePost,deletePost,likeOrDislikePost,getPostDetails,getPosts};