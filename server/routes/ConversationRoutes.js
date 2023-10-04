const { newConversation, getConvoOfUser, newMessage, getConvowithConvoId } = require("../controllers/conversationController");

const router = require("express").Router();

router.route("/newConversation").post(newConversation);
router.route("/convo/:userId").post(getConvoOfUser);
router.route("/sendChat").post(newMessage);
router.route("/conversation/:convoId").get(getConvowithConvoId);

module.exports = router;