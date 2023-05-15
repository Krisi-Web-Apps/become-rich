const router = require("express").Router();
const questions = require("../controllers/questions");

router.get("/:id", questions.get.byId);

router.post("/", questions.post.save);

module.exports = router;
