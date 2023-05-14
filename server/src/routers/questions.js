const router = require("express").Router();
const questions = require("../controllers/questions");

router.post("/", questions.post.insert);

module.exports = router;
