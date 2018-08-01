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

  $("#job-search-form").on("submit", function (e) {
    e.preventDefault();
    var locationInput = $("#city-input").val().trim() || "San Diego, CA";
    console.log(locationInput);
    var googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBLtaoiTDQbPfj9S_FGDDEulwAzVdGOC7w&q=";
    $("#google-map-iframe").attr("src", googleMapUrl + locationInput);

    $.ajax({
        method: "GET",
        url: "/api/search/job/" + locationInput
    }).then(function (data) {
      $("#job-search").html("");
      for (var i = 0; i < 10; i++){
        $("#title").html(data.listings.listing[i].title);
        $("#company").html(data.listings.listing[i].company);
        $("#application").html(data.listings.listing[i].apply_url)
        $("#description").html(data.listings.listing[i].description);
        $("#perks").html(data.listings.listing[i].perks);
      }
     
        console.log(data);
    }).catch(function (err) {
        console.log(err.responseText);
        alert(err.responseText);
    });
});


});
