var express = require('express');
var router = express.Router();
var mailer = require('nodemailer');
var xoauth2 = require('xoauth2');

//PARTIE MAILING
router.post('/:idAnnouncement', function(req, res, next) {
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
        if(targetAnnouncement.reserved != "false")
        {
            var userOwner = users.filter(function (user) {
                return user.id === targetAnnouncement.idUserOwner;
            });
            if(userOwner.length > 0)
            {
                userOwner = userOwner[0];
                var userWhoHasReserved = users.filter(function (user) {
                    return user.id === targetAnnouncement.reserved;
                });
                if(userWhoHasReserved.length > 0)
                {
                    userWhoHasReserved = userWhoHasReserved[0];

                    var smtpTransport = mailer.createTransport({
                        service: "gmail",
                        auth: {
                                user: "expresstp.ingesup@gmail.com",
                                pass: "ynovingesup"
                            }
                    });
                    var mailUserOwner = {
                        from: "AIRBNB <expresstp.ingesup@gmail.com>",
                        to: userOwner.mail,
                        subject: "Booking",
                        html: "<b>Une réservation vient d'être effectué sur votre annonce \""+targetAnnouncement.name+"\"."
                    };
                    var mailUserWhoHasReserved = {
                        from: "AIRBNB <expresstp.ingesup@gmail.com>",
                        to: userWhoHasReserved.mail,
                        subject: "Booking",
                        html: "<b>Nous vous confirmons votre reservation concernant l'annonce \""+targetAnnouncement.name+"\"."
                    };
                    smtpTransport.sendMail(mailUserOwner, function(error, response){
                        if(error){
                            console.log("Erreur lors de l'envoi du mail!");
                        }else{
                            console.log("Mail envoyé avec succès!");
                            res.status(500).send("Mail non envoyé");
                        }
                        smtpTransport.close();
                    });
                    smtpTransport.sendMail(mailUserWhoHasReserved, function(error, response){
                        if(error){
                            console.log("Erreur lors de l'envoi du mail!");
                        }else{
                            console.log("Mail envoyé avec succès!");
                            res.status(500).send("Mail non envoyé");
                        }
                        smtpTransport.close();
                    });
                    res.send("Mail envoyé !");
                }
                else
                    res.status(400).send("Requête invalide");
            }
            else
                res.status(400).send("Requête invalide");
        }
        else
            res.status(400).send("Requête invalide");
    }
    else
        res.status(400).send("Requête invalide");
});

module.exports = router;
