$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var nameInput = $("input#name-input");
  var photoURLInput = $("input#photo-url-input");
  var companyInput = $("input#company-input");
  var locationInput = $("input#location-input");
  var devTypeInput = $("#dev-type-input");
  var positionInput = $("#position-input");
  var languageInput = $("#languages-input");
  var degreeInput = $("#degree-input");
  var experienceInput = $("#experience-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    console.log("Does this run?");
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      photoURL: photoURLInput.val().trim(),
      name: nameInput.val().trim(),
      company: companyInput.val().trim(),
      location: locationInput.val().trim(),
      devType: devTypeInput.val(),
      position: positionInput.val().trim(),
      languages: languageInput.val().trim(),
      degree: degreeInput.val(),
      experience: experienceInput.val()
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
    companyInput.val("");
    locationInput.val("");
    devTypeInput.val("");
    positionInput.val("");
    degreeInput.val("");
    experienceInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData).then(function (data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
