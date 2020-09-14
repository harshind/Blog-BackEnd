const express = require("express");
const Admin = require("../models/Admin");
const { compareHash } = require("../services/hash");
const { adminTokenGenerator } = require("../services/adminTokenManager");

const AdminRouter = express.Router();

AdminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).exec();
    if (admin) {
      const result = await compareHash(password, admin.passwordHash);
      if (result) {
        const jwtToken = adminTokenGenerator(email);
        res.cookie("jwt", jwtToken, {
          httpOnly: true,
          secure: true
        });
        res.status(200).json({
          status: "SUCCESS",
          jwtToken
        });
      } else {
        res.status(400).send("Invalid User");
      }
    } else {
      res.status(400).send("Invalid User");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = AdminRouter;
