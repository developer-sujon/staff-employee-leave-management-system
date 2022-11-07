//External Lib  import
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const app = new express();

//Internal Lib Import
const {
  DefaultErrorHandler,
  NotFoundError,
} = require("./src/helper/ErrorHandler");

//Confiqure dotenv
dotenv.config({ path: path.join(__dirname, "./.env") });

//Import Database Confiq
const connectDB = require("./src/confiq/db");

//Import route
const routes = require("./src/routes");

//Security lib import
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

//Security middleware emplement
app.use(cors());
app.use(hpp());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
    },
  }),
);
app.use(expressMongoSanitize());
app.use(xssClean());

//Default middleware emplement
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const DB_OPTIONS = {
  user: process.env.MONGODB_DATABASE_USERNAME,
  pass: process.env.MONGODB_DATABASE_PASSWORD,
  dbName: process.env.MONGODB_DATABASE_NAME,
  autoIndex: true,
};

//connection database
connectDB(MONGODB_CONNECTION_URL, DB_OPTIONS);

// Routing Implement
app.use("/api/v1", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // Add React Front End Routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//static file
app.use("/", express.static(path.join(__dirname, "public")));

//Not Found Error Handler
app.use(NotFoundError);

// Default Error Handler
app.use(DefaultErrorHandler);

module.exports = app;
