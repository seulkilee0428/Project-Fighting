// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
const viewController = require("./controllers/view-controller.js");
const workoutController = require("./controllers/workout-controller.js");
const exerciseController = require("./controllers/exercise-controller.js");


app.use(viewController);
app.use(workoutController);
app.use(exerciseController);

//quotes api call

// const api_helper = require("./API_helper.js")

// app.get('/', (req, res) => {
//   api_helper.make_API_call('https://api.quotable.io/random')
//     .then(response => {
//       res.json(response)
//     })
//     .catch(error => {
//       res.send(error)
//     })
// })

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on: http://localhost:" + PORT);
  });
});
