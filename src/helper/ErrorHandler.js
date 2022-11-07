//Create Custom Error
const CreateError = (msg, status = 400) => {
  const e = new Error(msg);
  e.status = status;
  return e;
};

//Not Found Error Handler
const NotFoundError = (req, res, next) => {
  const error = CreateError(
    `Your Requested Content was not found on this Server`,
    404,
  );
  next(error);
};

//Default Error Handler
const DefaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : [],
  });

  //create error log file
};

module.exports = { DefaultErrorHandler, CreateError, NotFoundError };
