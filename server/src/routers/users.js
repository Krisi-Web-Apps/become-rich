const router = require("express").Router();
const users = require("../controllers/users");

router.post("/register", users.post.register);

module.exports = router;
