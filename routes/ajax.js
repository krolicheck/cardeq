var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let aloha = {

    };
    aloha.units = new Array();

    aloha.units.push({
         id : "Dwarf1"
        ,name : "Dwarf"
        ,selected : true
        ,location :  {
             x : 10
            ,y : 4
        }
    });

    aloha.units.push({
         id : "Dwarf2"
        ,name : "Dwarf"
        ,location :  {
             x : 0
            ,y : 0
         }
    });
    aloha.units.push({
        id : "Dwarf3"
        ,name : "Dwarf"
        ,location :  {
             x : 1
            ,y : 1
        }
    });
    aloha.units.push({
        id : "Dwarf4"
        ,name : "Dwarf"
        ,location :  {
            x : 2
            ,y : 2
        }
    });
    aloha.units.push({
        id : "Dwarf5"
        ,name : "Dwarf"
        ,location :  {
            x : 3
            ,y : 3
        }
    });
    aloha.units.push({
        id : "Dwarf6"
        ,name : "Dwarf"
        ,location :  {
            x : 4
            ,y : 4
        }
    });
    aloha.units.push({
        id : "Dwarf7"
        ,name : "Dwarf"
        ,location :  {
            x : 9
            ,y : 8
        }
    });
    aloha.units.push({
    id : "Dwarf8"
        ,name : "Dwarf"
        ,location :  {
        x : 10
            ,y : 8
    }
});

    res.send(JSON.stringify(aloha));
});

module.exports = router;
