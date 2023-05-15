const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  next();
};

module.exports = {
  errorHandler,
};
