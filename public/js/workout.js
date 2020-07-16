$(document).ready(function () {
    var nameInput = $("#workout-name");
    var workoutList = $("tbody");
    var workoutContainer = $(".workout-container");
    $(document).on("submit", "#workout-form", handleWorkoutFormSubmit);
    $(document).on("click", ".delete-workout", handleDeleteButtonPress);

    // Getting the list of Workouts
    getWorkouts();

    //  what happens when the form is submitted to create a new Workout
    function handleWorkoutFormSubmit(event) {
        event.preventDefault();
        //  do nothing if the plan fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        upsertWorkout({
            name: nameInput
                .val()
                .trim()
        });
    }

    // create a workout
    function upsertWorkout(workoutData) {
        $.post("/api/workouts", workoutData)
            .then(getWorkouts);
    }

    // create a new list row for workouts
    function createWorkoutRow(workoutData) {
        console.log(workoutData);
        var newTr = $("<tr>");
        newTr.data("workout", workoutData);
        newTr.append("<td>" + workoutData.name + "</td>");
        // newTr.append("<td># of exercises each plan has</td>"); Future add-on feature
        newTr.append("<td><a href='/list?workout_id=" + workoutData.id + "'>Go to Exercises</a></td>");
        newTr.append("<td><a href='/exercise?workout_id=" + workoutData.id + "'>Create an Exercise</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-workout'>Delete Workout</a></td>");
        return newTr;
    }

    // show  workouts 
    function getWorkouts() {
        $.get("/api/workouts", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createWorkoutRow(data[i]));
            }
            renderWorkoutList(rowsToAdd);
            nameInput.val("");
        });
    }

    // list of workouts to the page
    function renderWorkoutList(rows) {
        workoutList.children().not(":last").remove();
        workoutContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            workoutList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no workouts
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create an Workout before you can create an Exercise.");
        workoutContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("workout");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/workouts/" + id
        })
            .then(getWorkouts);
    }
});
