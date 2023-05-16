const router = require("express").Router();
const users = require("../controllers/users");
const { isAuth } = require("../config/middlewares");

router.get("/", isAuth, users.get.loggedInUser);

router.post("/register", users.post.register);
router.post("/login", users.post.login);

module.exports = router;
