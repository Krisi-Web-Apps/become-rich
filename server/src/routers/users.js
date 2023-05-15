const router = require("express").Router();
const users = require("../controllers/users");

router.post("/register", users.post.register);
router.post("/login", users.post.login);

module.exports = router;
