const express = require("express");
const router = express.Router();
const postController = require("../controller/postConroller");

router.get("/getPost", postController.getPost);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/getPostsByUser", postController.getPostsByUser);
router.post("/createPost", postController.createPost);
router.post("/updatePost", postController.updatePost);
router.delete("/deletePost", postController.deletePost);

module.exports = router;