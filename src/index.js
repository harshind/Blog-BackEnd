require("./config/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PostRouter = require("./routers/postRouter");
const AuthorRouter = require("./routers/authorRouter");
const AdminRouter = require("./routers/adminRouter");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Blog API Server!</h1>");
});

app.use("/posts", PostRouter);
app.use("/authors", AuthorRouter);
app.use("/admin", AdminRouter);

app.listen(8081, () => {
  console.log("Server started");
});
