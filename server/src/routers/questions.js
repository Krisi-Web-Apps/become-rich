const router = require("express").Router();
const questions = require("../controllers/questions");
const { isAuth, isAdmin } = require("../config/middlewares");

router.get("/random", questions.get.random);
router.get("/:id", questions.get.byId);

router.post("/", isAuth, isAdmin, questions.post.save);

router.delete("/:id", isAuth, isAdmin, questions.del.byId);

module.exports = router;
