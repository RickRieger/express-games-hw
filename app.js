const express = require("express");
const logger = require("morgan");

const gameRouter = require("./routes/gameRouter");
const indexRouter = require("./routes/indexRouter");
const app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());

// if anyone goes here, take them to indexRouter
app.use("/", indexRouter);
// if anyone goes here, take them to teamRouter
app.use("/api/game", gameRouter);


// app.listen(3000, function () {
//   console.log(`Server is running on PORT: ${3000}`);
// });

module.exports = app;