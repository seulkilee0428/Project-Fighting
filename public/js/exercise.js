$(document).ready(function () {
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var exerciseForm = $("#exercise");

    var workoutSelect = $("#workout");
    $(exerciseForm).on("submit", handleFormSubmit);
    var url = window.location.search;
    var exerciseId;
    var workoutId;
    var updating = false;

    if (url.indexOf("?exercise_id=") !== -1) {
        exerciseId = url.split("=")[1];
        getExerciseData(exerciseId, "exercise");
    }
    else if (url.indexOf("?workout_id=") !== -1) {
        workoutId = url.split("=")[1];
    }
    getWorkouts();

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!titleInput.val().trim() || !bodyInput.val().trim() || !workoutSelect.val()) {
            return;
        }

        var newExercise = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            WorkoutId: workoutSelect.val()
        };
        //  updating an exercise or create a  new exercise
        if (updating) {
            newExercise.id = exerciseId;
            updateExercise(newExercise);
        }
        else {
            submitExercise(newExercise);
        }
    }

    // Submits a new exercise 
    function submitExercise(exercise) {
        $.post("/api/exercises", exercise, function () {
            window.location.href = "/index";
        });
    }

    // Gets exercise data for the current exercise or  adding to an existing exercises
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
                titleInput.val(data.title);
                bodyInput.val(data.body);
                WorkoutId = data.WorkoutId || data.id;
                updating = true;
            }
        });
    }

    // get Workout plan and  list of Workouts
    function getWorkouts() {
        $.get("/api/workouts", renderWorkoutList);
    }
    // Show  list of workouts, or if there are none, direct the user to the page to create an workout plan 
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

    // Creates the workout options in dropdown
    function createWorkoutRow(workout) {
        var listOption = $("<option>");
        listOption.attr("value", workout.id);
        listOption.text(workout.name);
        return listOption;
    }

    // Update an  exercise
    function updateExercise(exercise) {
        $.ajax({
            method: "PUT",
            url: "/api/exercises",
            data: exercise
        })
            .then(function () {
                window.location.href = "/index";
            });
    }
});

