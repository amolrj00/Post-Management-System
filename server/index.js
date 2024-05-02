const express = require("express");
const app = express();
const cors = require("cors")

const db  = require("./models");
app.use(express.json());
app.use(cors());


// Routers Posts
const postRouter = require('./routes/Posts');
app.use("/posts",postRouter);


// Routers Comments
const commentsRouter = require('./routes/Comments');
app.use("/comments",commentsRouter);

// Routers Users
const usersRouter = require('./routes/Users');
app.use("/auth",usersRouter);


// Routers Likes
const likesRouter = require('./routes/Likes');
app.use("/likes",likesRouter);








db.sequelize.sync().then(() => {
    
    app.listen(6060, () => {
    console.log("Server is Running on port 6060");
});
});