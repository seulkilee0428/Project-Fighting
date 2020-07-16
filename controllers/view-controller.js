// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const router = require('express').Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

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

router.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/index');
  }
  res.render('login', { layout: "main" });
});

router.get('/signup', function (req, res) {
  if (req.user) {
    res.redirect('/index');
  }
  res.render('signup', { layout: "main" });
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