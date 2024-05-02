const express = require("express");
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');


router.get("/", async (req, res) => {
    const listOfPosts = await Comments.findAll();
    res.json(listOfPosts);
});

router.get("/:postId", async (req, res, err) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll( { where: { PostId: postId } } );
    res.json(comments);
    console.log(err);
});

router.post("/", validateToken, async (req, res, err) => {
    const comment = req.body;   
    const username  = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
    console.log(err);
});

router.delete("/:commentId", validateToken, async(req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        }
    });
    res.json("DELETE SUCCESSFULLY")
});
module.exports = router;
