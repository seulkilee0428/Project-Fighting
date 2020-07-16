// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const router = require('express').Router();
const db = require("../models");

// Routes
// =============================================================


// Each of the below routes just handles the HTML page that the user gets sent to.



router.get('/index', renderBlog);
router.get('/', renderBlog);

router.get('/list', renderBlog);

router.get("/workouts", function (req, res) {
  res.render('workouts');
});



router.get("/exercise", function (req, res) {
  res.render('exercise');
});

router.get("/list", function (req, res) {
  res.render('list');
});

// helper for / and blog routes
function renderBlog(req, res) {
  var query = {};
  if (req.query.workout_id) {
    query.WorkoutId = req.query.workout_id;
  }
  db.Exercise.findAll({
    where: query,
    include: [db.Workout]
  }).then(function (exercises) {
    res.render('list', { exercises: exercises })
  });
}

module.exports = router;