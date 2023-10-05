const conversationSchema = require("../models/ConversationSchema");
const messageSchema = require("../models/MessageSchema");
const {Server} = require("socket.io");
const io = new Server({
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    },
})
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
          members: { $in: [req.params.userId] },
        });
        if(!convo)
        {
            return res.status(201).json({success:false});
        }
        return res.status(201).json({ convo });        
    } catch (error) {
        console.log("error in getting convo of user");
        return res.status(500).json({success:false});
    }
}

const toSend = [];

const checkDuplicateUsers = (userId,socketId)=>{
    !toSend.some(user=>user.userId === userId)&&toSend.push({userId,socketId})
}

const newMessage = async (req, res) => {
  const message = new messageSchema(req.body);
  try {
    const savedMsg = await message.save();
    io.on("connection",(socket)=>{
        socket.on("send_message",(data)=>{
            console.log(data);
            checkDuplicateUsers(data.userId,socket.id);
            socket.to(toSend[0].socketId).emit("receive_msg", data.newMsg);
        })
    })
    return res.status(201).json({ msg: savedMsg });
  } catch (error) {
    console.log("Error in creating a new Message");
    return res.status(500).json({ success: false });
  }
};

const getConvowithConvoId = async(req,res)=>{
    const messages = await messageSchema.find({conversationId:req.params.convoId});
    if(!messages){
        return res.status(401).json({msg:[]})
    }
    return res.status(201).json({messages});
}

module.exports = {newConversation,getConvoOfUser,newMessage,getConvowithConvoId};