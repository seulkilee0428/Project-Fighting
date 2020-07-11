// Requiring our models
const db = require("../models");
const express = require('express');
const router = express.Router();


// Routes
// =============================================================

// GET route for getting all of the exercises
router.get("/api/exercises", function (req, res) {
    var query = {};
    if (req.query.author_id) {
        query.WorkoutId = req.query.author_id;
    }
    db.Exercise.findAll({

        where: query,

        include: [db.Workout]

    }).then(function (dbExercise) {
        res.json(dbExercise);
    });
});

// Get rotue for retrieving a single Exercise
router.get("/api/exercises/:id", function (req, res) {
    db.Exercise.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbExercise) {
        console.log(dbExercise);
        res.json(dbExercise);
    });
});

// Exercise route for saving a new Exercise
router.post("/api/exercises", function (req, res) {
    db.Exercise.create(req.body).then(function (dbExercise) {
        res.json(dbExercise);
    });
});

// DELETE route for deleting exercises
router.delete("/api/exercises/:id", function (req, res) {
    db.Exercise.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbExercise) {
        res.json(dbExercise);
    });
});

// PUT route for updating exercises
router.put("/api/exercises", function (req, res) {
    db.Exercise.update(
        req.body, {
        where: {
            id: req.body.id
        }
    }).then(function (dbExercise) {
        res.json(dbExercise);
    });
});

module.exports = router;