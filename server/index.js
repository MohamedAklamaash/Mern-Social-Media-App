const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postRoutes");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoutes);
app.use("/api/posts",postsRoutes);

const mongoConnection = require("./mongoConnection")();

app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})