var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//PARTIE LOGIN
router.patch('/', function(req, res, next) {
    if(req.query.username && req.query.password)
    {
        var username = req.query.username;
        var password = req.query.password;
    }
    else
        res.status(400).send("Requête invalide");
    
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
    var matchedUsers = users.filter(function (user) {
        return user.username === username && bcrypt.compareSync(password, user.pass);
    });
    if(matchedUsers.length > 0){
        matchedUsers[0].lastConnexion = ""+Date.now();
        res.send("Authentification réussie");
    }
    else
        res.status(401).send("Authentification échouée");
});

module.exports = router;
