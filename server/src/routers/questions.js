const router = require("express").Router();
const questions = require("../controllers/questions");

router.post("/", questions.post.save);

module.exports = router;
