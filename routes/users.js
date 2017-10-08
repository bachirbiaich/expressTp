var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//PARTIE UPDATE PROFILE
router.patch('/:idUser', function(req, res, next) {
  var users = 
  [
      {
          "id": "1",
          "username": "fredh",
          "pass": "$2a$10$y.B7Qi4zmCCilHyRk5qrB.ocv70ze33po2frrA.49clwI6RbirAga", //okok en bcrypt
          "firstname": "Frederic",
          "lastname": "HENRY",
          "mail": "bachir.biaich@ynov.com",
          "lastConnexion":"",
      },
      {
          "id": "85",
          "username": "bachirb",
          "pass": "$2a$10$y.B7Qi4zmCCilHyRk5qrB.ocv70ze33po2frrA.49clwI6RbirAga", //okok en bcrypt
          "firstname": "Bachir",
          "lastname": "BIAICH",
          "mail": "bachir.biaich@ynov.com",
          "lastConnexion":"",
      }
  ];

  var user = users.filter(function (anUser) {
    return anUser.id === req.params.idUser;
  });
  if(user.length > 0){
      user = user[0];
      if(req.query.firstname)
          user.firstname = req.query.firstname;
      if(req.query.lastname)
          user.lastname = req.query.lastname;
      if(req.query.mail)
        user.mail = req.query.mail;
      if(req.query.pass)
      {
        user.pass = bcrypt.hashSync(req.query.pass, 10);
      }
      res.send(user);
  }
  else
      res.status(400).send("Requête invalide !");
  });

module.exports = router;
