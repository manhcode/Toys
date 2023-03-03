const mongoose = require("mongoose");
const Toy = require("../models/toy");

// create new toy
exports.createToy = async (req, res) => {
    const toy = new Toy({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    return toy
        .save()
        .then((newToy) => {
            return res.status(201).json({
                success: true,
                message: "New toy created successfully",
                Toy: newToy,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: error.message,
            });
        });
};

// Get all toys
exports.getAllToy = async (req, res) => {
    Toy.find()
        .select("_id name price quantity")
        .then((allToy) => {
            return res.status(200).json({
                success: true,
                message: "A list of all toys",
                Toy: allToy,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                ge: "Server error. Please try again.",
                error: err.message,
            });
        });
};

exports.updateToy = async (req, res) => {
    const id = req.params.toyId;

    const updateObject = req.body;
    Toy.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Toy is updated",
                updateToy: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
            });
        });
};

exports.deleteToy = async (req, res) => {
    const id = req.params.toyId;
    Toy.findByIdAndRemove(id)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(500).json({
                success: false,
            })
        );
};
