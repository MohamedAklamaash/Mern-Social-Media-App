const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postRoutes");
const convoRoutes = require("./routes/ConversationRoutes");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
const mongoConnection = require("./mongoConnection")();

app.use("/api/users",userRoutes);
app.use("/api/posts",postsRoutes);
app.use("/api/chat",convoRoutes);

app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})