var express = require('express');
var router = express.Router();

//PARTIE BOOKING
router.patch('/:idAnnouncement/:idUser', function(req, res, next) {
    var announcements = 
        [
            {
                "id": "1",
                "idUserOwner": "1",
                "name": "Villa Miami",
                "desc": "Etiam vitae semper velit. Nullam aliquet massa purus, quis consectetur nibh posuere et. Donec dapibus molestie venenatis. Etiam ullamcorper vestibulum diam quis interdum. Donec volutpat finibus augue, sed placerat lorem fermentum ac. Vestibulum volutpat consequat nunc fermentum molestie. ",
                "location": "Miami, Etats-Unis",
                "reserved": "false",
            },
            {
                "id": "2",
                "idUserOwner":"1",
                "name":"Appartement Paris",
                "desc":"Etiam vitae semper velit. Nullam aliquet massa purus, quis consectetur nibh posuere et. Donec dapibus molestie venenatis. Etiam ullamcorper vestibulum diam quis interdum. Donec volutpat finibus augue, sed placerat lorem fermentum ac. Vestibulum volutpat consequat nunc fermentum molestie. ",
                "location":"Paris, France",
                "reserved":"85",
            },
            {
                "id": "3",
                "idUserOwner":"1",
                "name":"Appartement Londres",
                "desc":"Etiam vitae semper velit. Nullam aliquet massa purus, quis consectetur nibh posuere et. Donec dapibus molestie venenatis. Etiam ullamcorper vestibulum diam quis interdum. Donec volutpat finibus augue, sed placerat lorem fermentum ac. Vestibulum volutpat consequat nunc fermentum molestie. ",
                "location":"Londres, Royaume-Uni",
                "reserved":"false",
            },
            {
                "id": "4",
                "idUserOwner":"1",
                "name":"Villa Nice",
                "desc":"Etiam vitae semper velit. Nullam aliquet massa purus, quis consectetur nibh posuere et. Donec dapibus molestie venenatis. Etiam ullamcorper vestibulum diam quis interdum. Donec volutpat finibus augue, sed placerat lorem fermentum ac. Vestibulum volutpat consequat nunc fermentum molestie. ",
                "location":"Nice, France",
                "reserved":"85",
            }
        ];
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
    var targetAnnouncement = announcements.filter(function (announcement) {
            return announcement.id === req.params.idAnnouncement;
        });
    if(targetAnnouncement.length > 0){
        targetAnnouncement = targetAnnouncement[0];
        var matchedUsers = users.filter(function (user) {
            return user.id === req.params.idUser;
        });
        if(matchedUsers.length > 0)
        {
            if(targetAnnouncement.reserved == "false")
            {
                targetAnnouncement.reserved = ""+req.params.idUser;
                res.send(targetAnnouncement);
            }
            else
               res.status(409).send("Déjà reservé !");
        }
        else
            res.status(400).send("Requête invalide");
    }
    else
        res.status(400).send("Requête invalide");
    res.send(announcements);
});

module.exports = router;
