$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var nameInput = $("input#name-input");
  var companyInput = $("input#company-input");
  var locationInput = $("input#location-input");
  var devTypeInput = $("input#dev-type-input");
  var positionInput = $("input#position-input");
  var degreeInput = $("input#degree-input");
  var experienceInput = $("input#experience-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      company: companyInput.val().trim(),
      location: locationInput.val().trim(),
      devType: devTypeInput.val(),
      position: positionInput.val().trim(),
      degree: degreeInput.val(),
      experience: experienceInput.val()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name, userData.company, userData.location, userData.devType, userData.position, userData.degree, userData.experience);
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
  function signUpUser(email, password, name, company, location, devType, position, degree, experience) {
    $.post("/api/signup", {
      email: email,
      password: password,
      name: name,
      company: company,
      location: location,
      devType: devType,
      position: position,
      degree: degree,
      experience: experience
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
