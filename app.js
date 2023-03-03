// import dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const indexRoutes = require("./server/routes/index");
const mainRoutes = require("./server/routes/main");

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up mongoose
mongoose
    .connect(
        "mongodb+srv://root:admin@learnit.lgi9d.mongodb.net/toys?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Error connecting to database");
    });

// set up route
app.use("/", indexRoutes);
app.use("/api/", mainRoutes);

// set up port
const port = process.env.PORT || "3000";

app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});
