const ObjectID = require("bson-objectid");
const express = require("express");
const Author = require("../models/Author");
const Post = require("../models/Post");

const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.status(200).json({
      posts
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
})
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate("author");
      res.status(200).json({
        post
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  })
  .post("/", async (req, res) => {
    try {
      console.log(req.body);
      const { title, content, author } = req.body;
      const result = await new Post({
        title,
        content,
        author: author
      }).save();
      console.log(result);
      res.status(200).json({
        result
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  });

module.exports = PostRouter;
