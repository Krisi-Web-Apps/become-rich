require("dotenv").config();
const colors = require("colors");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routers/common"));
app.use("/questions", require("./routers/questions"));

const { errorHandler } = require("./config/middlewares");
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Server started on port: ${process.env.PORT} in deveopment`.green
    );
  }
});
