const router = require("express").Router();
const questions = require("../controllers/questions");
const { isAuth, isAdmin } = require("../config/middlewares");

router.get("/random", questions.get.random);
router.get("/:id", questions.get.byId);
router.get("/admin/all", questions.get.all);
router.get("/admin/search", questions.get.search);

router.post("/admin", isAuth, isAdmin, questions.post.save);

router.delete("/admin/all", isAuth, isAdmin, questions.del.all);
router.delete("/admin/:id", isAuth, isAdmin, questions.del.byId);

module.exports = router;
