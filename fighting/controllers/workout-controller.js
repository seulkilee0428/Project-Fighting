const db = require("../models");
const express = require('express');
const router = express.Router();

// Find all workouts and return them to the user with res.json
router.get("/api/workouts", function (req, res) {
    db.Workout.findAll({
        include: [db.Exercise]
    }).then(function (dbWorkout) {
        res.json(dbWorkout);
    });
});

router.get("/api/workouts/:id", function (req, res) {
    // Find one Workout with the id in req.params.id and return them to the user with res.json
    db.Workout.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbWorkout) {
        res.json(dbWorkout);
    });
});

router.post("/api/workouts", function (req, res) {
    // Create an Workout with the data available to us in req.body
    console.log(req.body);
    db.Workout.create(req.body).then(function (dbWorkout) {
        res.json(dbWorkout);
    });
});

router.delete("/api/workouts/:id", function (req, res) {
    // Delete the Workout with the id available to us in req.params.id
    db.Workout.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbWorkout) {
        res.json(dbWorkout);
    });
});

module.exports = router;