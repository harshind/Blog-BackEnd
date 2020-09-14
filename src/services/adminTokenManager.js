const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

const adminTokenGenerator = (email) => {
  const token = jwt.sign(
    {
      sub: "admin",
      email
    },
    jwtKey,
    {
      expiresIn: "5 hours"
    }
  );
  return token;
};

exports.adminTokenGenerator = adminTokenGenerator;
