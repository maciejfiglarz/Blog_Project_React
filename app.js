const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("config");
const bodyParser = require("body-parser");
const multer = require("multer");

const mongoose = require("mongoose");
const prod = require("./config/prod");
console.log("prod", prod);
const postRouter = require("./api/routes/post");
const fileRouter = require("./api/routes/file");
const commentRouter = require("./api/routes/comment");
const userRouter = require("./api/routes/user");
const voteRouter = require("./api/routes/vote");
const postMenagerRouter = require("./api/routes/post-menager");

const adminPostRouter = require("./admin/routes/post");
const adminIndexRouter = require("./admin/routes/index");
const adminUserRouter = require("./admin/routes/user");

const morgan = require("morgan");

var app = express();

const mongoConnection = (mode) => {
  return mongoose
    .connect(
      `mongodb://${mode.database}:${mode.databasePassword}@mongo46.mydevil.net:27017/${mode.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to mongoDB..."))
    .catch((err) =>
      console.log(new Error("Colud not connect to mongoDB", err))
    );
};

mongoConnection(prod);

//dev

// mongoose
//   .connect("mongodb://localhost:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to mongoDB..."))
//   .catch((err) => console.log(new Error("Colud not connect to mongoDB", err)));

app.set(morgan("dev"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.set("twig options", {
  allow_async: false, // Allow asynchronous compiling
  strict_variables: false,
});

app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/post", postRouter);
app.use("/file", fileRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);
app.use("/vote", voteRouter);
app.use("/post-menager", postMenagerRouter);

app.use("/admin/post", adminPostRouter);
app.use("/admin/user", adminUserRouter);
app.use("/admin", adminIndexRouter);

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, console.log(`Listening on port ${PORT}...`));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// error handler
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client","build", "index.html"));
  });
}

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
