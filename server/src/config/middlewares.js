const { verifyToken, decryptToken } = require("../utils");
const users = require("../services/users");
const asyncHandler = require("express-async-handler");

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  next();
};

const isAuth = asyncHandler(async (req, res, next) => {
  const unsplittedToken = req.headers.authorization;

  if (!unsplittedToken) {
    res.status(400).send({ message: "The token can not be null." });
    return;
  }

  const token = unsplittedToken.split(" ")[1];

  const decryptedToken = decryptToken(token);

  const decoded = verifyToken(decryptedToken);

  if (!decoded) {
    res.status(400).send({ message: "Invalid token." });
    return;
  }

  const fetchedUserPasswordResult = await users.get.passwordById(decoded.data.id);

  if (fetchedUserPasswordResult[0].password !== decoded.data.password) {
    res.status(403).send({ message: "The password is wrong." });
    return;
  }

  req.user = decoded.data;

  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    const fetchedUserRoleAsResult = await users.get.roleAsById(id);

    if (fetchedUserRoleAsResult[0].role_as !== "admin") {
      res.status(400).send({ message: "You are not authorized." });
      return;
    }

    next();
});

module.exports = {
  errorHandler,
  isAuth,
  isAdmin,
};
