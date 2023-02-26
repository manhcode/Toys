const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async function (req, res, next) {
    const toys = await axios.get(
        `${
            process.env.NODE_ENV
                ? "https://apptoy.herokuapp.com/"
                : "http://localhost:3000/"
        }api/toys`
    );
    res.render("index", { toys: toys.data.Toy, env: process.env.NODE_ENV });
});

module.exports = router;
