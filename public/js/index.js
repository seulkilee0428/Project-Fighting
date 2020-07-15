$(document).ready(function () {

  var blogContainer = $(".blog-container");
  var exerciseCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleExerciseDelete);
  $(document).on("click", "button.edit", handleExerciseEdit);

  // API call to delete exercises
  function deleteExercise(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/exercises/" + id
    })
      .then(function () {
        $(`[data-exercise=${id}]`).remove();
      });
  }

  // exercise  to delete 
  function handleExerciseDelete() {
    var id = $(this)
      .closest('[data-exercise]')
      .attr("data-exercise");
    deleteExercise(id);
  }

  // exercise  to edit 
  function handleExerciseEdit() {
    var id = $(this)
      .closest('[data-exercise]')
      .attr("data-exercise");
    window.location.href = "/exercise?exercise_id=" + id;
  }

  //displays a messgae when there are no exercises in plan 
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Workout #" + id;
    }
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No exercises yet" + partial + ", navigate <a href='/exercise" + query +
      "'>here</a> in order to get started.");
    blogContainer.append(messageh2);
  }

});
