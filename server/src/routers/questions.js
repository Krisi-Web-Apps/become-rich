const router = require("express").Router();
const questions = require("../controllers/questions");

router.get("/random", questions.get.random);
router.get("/:id", questions.get.byId);

router.post("/", questions.post.save);

router.delete("/:id", questions.del.byId);

module.exports = router;
