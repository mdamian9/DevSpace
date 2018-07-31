$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $("#user-name").append(data.name);
    $("#user-email").append(data.email);
    $("#company-input").append(data.company);
    $("#user-location").append(data.location);
    $("#dev-type-input").append(data.devType);
    $("#user-position").append(data.position);
    $("#user-education").append(data.degree);
    $("#experience-input").append(data.experience);
  });

});
