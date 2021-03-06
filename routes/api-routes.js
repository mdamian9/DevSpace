// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var request = require("request");
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      photoURL: req.body.photoURL,
      name: req.body.name,
      company: req.body.company,
      location: req.body.location,
      devType: req.body.devType,
      languages: req.body.languages,
      position: req.body.position,
      degree: req.body.degree,
      experience: req.body.experience
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for updating and storing user data
  app.put("/api/members/:id", function (req, res) {
    console.log(req.body);
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }
    ).then(function (data) {
      res.json(data);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    // if (!req.user) {
    //   // The user is not logged in, send back an empty object
    //   res.json({});
    // }
    // else {
      db.User.findOne({
        where: {
          id: req.user.id
        },
        include: [db.Favorite]
      }).then(function(userData){
        res.json(userData);
      });
    // }
  });

  app.get("/api/search/job/:location", function (req, res) {
    var loc = req.params.location;
    var reqUrl = "https://authenticjobs.com/api/?api_key=f97ea855dd96f44b614b13ea7710f38e&method=aj.jobs.search&keywords=javascript&perpage=20&format=json&location=" + loc;
    request(reqUrl, function (err, response, body) {
      if (!err && response.statusCode === 200) {
        var dataObj = JSON.parse(body);
        if (dataObj.listings.total > 0) {
          res.json(dataObj);
        } else {
          res.status(404).send("No results found!");
        }

      } else {
        res.status(404).send(err);
      }
    });
  });

  app.post("/api/favorite", function (req, res) {
    db.Favorite.create({
      UserId: req.body.UserId,
      title: req.body.title,
      company: req.body.company,
      url: req.body.url,
      description: req.body.description,
      perks: req.body.perks
    }).then(function(data){
      res.json(data);
    })
  });

};
