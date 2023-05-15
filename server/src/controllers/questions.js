const asyncHandler = require("express-async-handler");

const questions = require("../services/questions");

const post = {
  save: asyncHandler(async (req, res) => {
    const { id, title, options } = req.body;

    if (!id) {
      const insertedResult = await questions.post.insert(
        title,
        JSON.stringify(options)
      );

      if (insertedResult.affectedRows > 0) {
        const questionResult = await questions.get.byId(
          insertedResult.insertId
        );
        res.send({
          ...questionResult[0],
          options: JSON.parse(questionResult[0].options),
        });
        return;
      }
    } else {
      const updatedResult = await questions.post.update(
        id,
        title,
        JSON.stringify(options)
      );

      if (updatedResult.affectedRows > 0) {
        const questionResult = await questions.get.byId(id);
        res.send({
          ...questionResult[0],
          options: JSON.parse(questionResult[0])
        });
        return;
      }
    }
  }),
};

module.exports = {
  post,
};
