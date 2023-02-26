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
    res.render("index", { toys: toys.data.Toy });
});

router.patch("/:toyId", async function (req, res, next) {
    const toys = await axios.patch(
        `${
            process.env.NODE_ENV
                ? "https://apptoy.herokuapp.com/"
                : "http://localhost:3000/"
        }api/toys/${req.params.toyId}`,
        req.body
    );
    res.render("index", { toys: toys.data.Toy });
});

module.exports = router;
