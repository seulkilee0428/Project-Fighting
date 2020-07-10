$(document).ready(function () {
    // Getting jQuery references to the exercise body, title, form, and author select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var exerciseForm = $("#exercise");
    // var authorSelect = $("#author");
    var workoutSelect = $("#workout");
    // Adding an event listener for when the form is submitted
    $(exerciseForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a exercise)
    var url = window.location.search;
    var exerciseId;
    // var authorId;
    var workoutId;
    // Sets a flag for whether or not we're updating a exercise to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the exercise id from the url
    // In '?exercise_id=1', exerciseId is 1
    if (url.indexOf("?exercise_id=") !== -1) {
        exerciseId = url.split("=")[1];
        getExerciseData(exerciseId, "exercise");
    }
    // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    // else if (url.indexOf("?author_id=") !== -1) {
    //   authorId = url.split("=")[1];
    // }

    else if (url.indexOf("?workout_id=") !== -1) {
        workoutId = url.split("=")[1];
    }

    // Getting the authors, and their exercises
    // getAuthors();
    getWorkout();

    // A function for handling what happens when the form to create a new exercise is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the exercise if we are missing a body, title, or author
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !workoutSelect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newExercise = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            workoutId: workoutSelect.val()
        };



        // If we're updating a exercise run updatePost to update a exercise
        // Otherwise run submitPost to create a whole new exercise
        if (updating) {
            newExercise.id = exerciseId;
            updateExercise(newExercise);
        }
        else {
            submitExercise(newExercise);
        }
    }

    // Submits a new exercise and brings user to blog page upon completion
    function submitExercise(exercise) {
        $.post("/api/exercises", exercise, function () {
            window.location.href = "/blog";
        });
    }

    // Gets exercise data for the current exercise if we're editing, or if we're adding to an author's existing exercises
    function getExerciseData(id, type) {
        var queryUrl;
        switch (type) {
            case "exercise":
                queryUrl = "/api/exercises/" + id;
                break;
            case "workout":
                queryUrl = "/api/workouts" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.WorkoutId || data.id)
                // If this exercise exists, prefill our exercise forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                WorkoutId = data.WorkoutId || data.id;
                // If we have a exercise with this id, set a flag for us to know to update the exercise
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Authors and then render our list of Authors
    function getWorkout() {
        $.get("/api/workouts", renderWorkoutList);
    }
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    function renderWorkoutList(data) {
        if (!data.length) {
            window.location.href = "/workouts";
        }
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createWorkoutRow(data[i]));
        }
        workoutSelect.empty();
        console.log(rowsToAdd);
        console.log(workoutSelect);
        workoutSelect.append(rowsToAdd);
        workoutSelect.val(workoutId);
    }

    // Creates the author options in the dropdown
    function createWorkoutRow(workout) {
        var listOption = $("<option>");
        listOption.attr("value", workout.id);
        listOption.text(workout.name);
        return listOption;
    }

    // Update a given exercise, bring user to the blog page when done
    function updateExercise(exercise) {
        $.ajax({
            method: "PUT",
            url: "/api/exercise",
            data: exercise
        })
            .then(function () {
                window.location.href = "/blog";
            });
    }
});
