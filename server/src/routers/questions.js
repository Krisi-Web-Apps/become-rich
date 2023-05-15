const router = require("express").Router();
const questions = require("../controllers/questions");
const { isAuth } = require("../config/middlewares");

router.get("/random", questions.get.random);
router.get("/:id", questions.get.byId);

router.post("/", isAuth, questions.post.save);

router.delete("/:id", isAuth, questions.del.byId);

module.exports = router;
