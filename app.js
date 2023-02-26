// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const mainRoutes = require("./server/routes/main");

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// set up mongoose
mongoose
    .connect(
        "mongodb+srv://root:admin@learnit.lgi9d.mongodb.net/Toys?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Error connecting to database");
    });

// set up route
app.use("/api/", mainRoutes);

// set up port
const port = 5035;
// set up route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Project with Nodejs Express and MongoDB",
    });
});
app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});