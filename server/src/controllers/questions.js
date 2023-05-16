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
      if (!parseInt(id)) {
        res.status(400).send({ message: "The id must be a number!" });
        return;
      }

      const updatedResult = await questions.post.update(
        id,
        title,
        JSON.stringify(options)
      );

      if (updatedResult.affectedRows === 0) {
        res.status(400).send({ message: "Invalid id." });
        return;
      }

      const questionResult = await questions.get.byId(id);
      
      res.send({
        ...questionResult[0],
        options: JSON.parse(questionResult[0].options),
      });
    }
  }),
};

const get = {
  byId: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "The id can not be null!" });
      return;
    }

    if (!parseInt(id)) {
      res.status(400).send({ message: "The id must be a number!" });
      return;
    }

    const questionResult = await questions.get.byId(id);

    if (questionResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    res.send({
      ...questionResult[0],
      options: JSON.parse(questionResult[0].options),
    });
  }),
  random: asyncHandler(async (req, res) => {
    const { limit } = req.query;

    if (limit && !parseInt(limit)) {
      res.status(400).send({ message: "The limit must be a number!" });
      return;
    }

    const randomQuestionsResult = await questions.get.random(limit);

    randomQuestionsResult.forEach(questionItem => {
      questionItem.options = JSON.parse(questionItem.options);
    });

    res.send(randomQuestionsResult);
  }),
  all: asyncHandler(async (req, res) => {
    const { limit, offset } = req.query;

    let fetchedQuestionsResult;

    if (limit && offset) fetchedQuestionsResult = await questions.get.allByLimit(limit, offset);
    else fetchedQuestionsResult = await questions.get.all();

    fetchedQuestionsResult.forEach(question => {
      question.options = JSON.parse(question.options);
    });

    res.send(fetchedQuestionsResult);
  }),
};

const del = {
  byId: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "The id can not be null!" });
      return;
    }

    if (!parseInt(id)) {
      res.status(400).send({ message: "The id must be a number!" });
      return;
    }

    const questionResult = await questions.get.byId(id);

    if (questionResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const deletedQuestionResult = await questions.del.byId(id);

    res.send({
      affected_rows: deletedQuestionResult.affectedRows,
    });
  }),
  all: asyncHandler(async (req, res) => {
    const deletedQuestionsResult = await questions.del.all();
    res.send({
      affected_rows: deletedQuestionsResult.affectedRows,
    });
  }),
};

module.exports = {
  post,
  get,
  del,
};
