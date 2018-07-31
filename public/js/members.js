$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $("#name").text(data.name);
    $("#email").append(data.email);

  });

  $("#update").on("click", function () {
    $.ajax({
      url: "/api/user_data",
      type: "PUT",
      success: function(response) {
        window.location.href = "/members";
      }
   });
  });

});
