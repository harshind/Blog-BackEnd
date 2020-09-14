const express = require("express");
const Author = require("../models/Author");
const Post = require("../models/Post");

const AuthorRouter = express.Router();

AuthorRouter.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).json({ authors });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
})
  .get("/:id", async (req, res) => {
    try {
      console.log(req.params.id);
      const authorPost = await Post.find({})
        .populate({
          path: "author",
          match: { _id: req.params.id }
        })
        .exec();
      console.log(JSON.parse(JSON.stringify(authorPost)));
      res.status(200).json({ authorPost });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })
  .post("/", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await new Author({
        name
      }).save();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = AuthorRouter;
