const router = require("express").Router();
const users = require("../controllers/users");
const { isAuth, isAdmin } = require("../config/middlewares");

router.get("/", isAuth, users.get.loggedInUser);
router.get("/admin/all", isAuth, isAdmin, users.get.all);
router.get("/admin/search", isAuth, isAdmin, users.get.search);

router.post("/register", users.post.register);
router.post("/login", users.post.login);
router.post("/", isAuth, users.post.update);

module.exports = router;
