const conversationSchema = require("../models/ConversationSchema");

const newConversation = async(req,res)=>{
    const newConvo = new conversationSchema({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const savedConvo = await newConvo.save();
        return res.status(201).json(savedConvo);
    } catch (error) {
        console.log("error in creating a new convo");
        return res.status(500).json({ success: false });
    }
}

const getConvoOfUser = async(req,res)=>{
    try {
        const convo = await conversationSchema.find({
            members: { $in: req.params.userId },
        });
        return res.status(201).json({ convo });        
    } catch (error) {
        console.log("error in getting convo of user");
        return res.status(500).json({success:false});
    }
}

module.exports = {newConversation,getConvoOfUser};