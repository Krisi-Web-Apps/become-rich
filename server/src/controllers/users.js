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

    const token = createToken({
      id: insertedUserResult.insertId,
      password: hashedPassword,
    });

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

    const token = createToken({
      id: fetchedUserResult[0].id,
      password: fetchedUserResult[0].password,
    });

    const encryptedToken = encryptToken(token);

    res.send({ token: encryptedToken });
  })
};

const get = {
  loggedInUser: asyncHandler(async (req, res) => {
    const { id } = req.user;

    const fetchedUserResult = await users.get.byId(id);

    delete fetchedUserResult[0].password;
    fetchedUserResult[0].options = JSON.parse(fetchedUserResult[0].options);

    res.send(fetchedUserResult[0]);
  }),
  all: asyncHandler(async (req, res) => {
    const { limit, offset } = req.query;

    let fetchedUsersResult;

    if (limit && offset) fetchedUsersResult = await users.get.allByLimit(limit, offset);
    else fetchedUsersResult = await users.get.all();

    fetchedUsersResult.forEach(user => {
      user.options = JSON.parse(user.options);
      delete user.password;
    });

    res.send(fetchedUsersResult);
  }),
}

module.exports = {
  post,
  get,
};
