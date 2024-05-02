const express = require("express");
const router = express.Router();
const { Posts , Likes } = require('../models');
const {validateToken}  = require('../middlewares/AuthMiddleware');



/*
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});
*/
/*
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    res.json(listOfPosts);
});
*/

router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });

    const likedPosts = await Likes.findAll({ where: {UserId: req.user.id} });
    res.json({listOfPosts: listOfPosts, likedPosts:likedPosts });
});

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] });
    res.json(listOfPosts);
});


router.put("/title", validateToken, async (req, res) => {
    const { newTitle } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id }});
   
    res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res) => {
    const { newText } = req.body;
    await Posts.update({ title: newText }, { where: { id: id }});
   
    res.json(newText);
});


router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
  
    console.log("-----------------post id on Router posts: ", postId);
  
    await Posts.destroy({ where: { id: postId } });
    res.json("Post deleted successfully...");
  });


module.exports = router;
