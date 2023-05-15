const asyncHandler = require("express-async-handler");

const users = require("../services/users");
const validations = require("../validations");
const { passwordHash, createToken, encryptToken, verifyPassword } = require("../utils");

const post = {
  register: asyncHandler(async (req, res) => {
    const { email, password, cpassword, username, gender, options } = req.body;

    if (!email || !validations.email(email)) {
      res.status(400).send({ message: "Invalid email address." });
      return;
    }

    if (!password || !validations.password(password)) {
      res.status(400).send({ message: "The password is to leak." });
      return;
    }

    if (password !== cpassword) {
      res.status(400).send({ message: "The password's don't match." });
      return;
    }

    if (!username || !validations.username(username)) {
      res.status(400).send({ message: "The username must contain upper, lower letters and underscores." });
      return;
    }

    const userResult = await users.get.byEmail(email);

    if (userResult.length > 0) {
      res.status(400).send({ message: "Dablicate email address." });
      return;
    }

    const hashedPassword = passwordHash(password);

    const insertedUserResult = await users.post.insert(
      email,
      hashedPassword,
      username,
      gender,
      JSON.stringify(options)
    );

    const token = createToken(insertedUserResult.insertId);

    const encryptedToken = encryptToken(token);

    res.send({ token: encryptedToken });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !validations.email(email)) {
      res.status(400).send({ message: "Invalid email address." });
      return;
    }

    const fetchedUserResult = await users.get.byEmail(email);

    if (fetchedUserResult.length === 0) {
      res.status(400).send({ message: "Invalid email address or password." });
      return;
    }

    const isValidPassword = verifyPassword(password, fetchedUserResult[0].password);

    if (!isValidPassword) {
      res.status(400).send({ message: "Invalid email address or password." });
      return;
    }

    const token = createToken(fetchedUserResult[0].id);

    const encryptedToken = encryptToken(token);

    res.send({ token: encryptedToken });
  })
};

module.exports = {
  post,
};
