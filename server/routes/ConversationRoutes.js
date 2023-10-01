const { newConversation, getConvoOfUser } = require("../controllers/conversationController");

const router = require("express").Router();

router.route("/newConversation").post(newConversation);
router.route("/convo/:userId").get(getConvoOfUser);

module.exports = router;