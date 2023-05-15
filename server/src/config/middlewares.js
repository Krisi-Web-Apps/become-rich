const { verifyToken, decryptToken } = require("../utils");

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  next();
};

const isAuth = (req, res, next) => {
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

  req.user = decoded;

  next();
}

module.exports = {
  errorHandler,
  isAuth,
};
