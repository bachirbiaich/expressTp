var express = require('express');
var router = express.Router();

//PARTIE SEARCH
router.get('/', function(req, res, next) {
    if(!req.query.q)
        res.status(400).send("Requête invalide");
    else
    {
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
        var matched = announcements.filter(function (announcement) {
            return announcement.name.toLowerCase().includes(req.query.q.toLowerCase()) || announcement.desc.toLowerCase().includes(req.query.q.toLowerCase()) || announcement.location.toLowerCase().includes(req.query.q.toLowerCase());
        });
        res.send(matched);
    }
});

module.exports = router;
