var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var aloha = {};
  aloha.funya = function(){
    console.log('funechka');
  };
  aloha.funya();
  aloha.alohan = 'huy';
  aloha.strength = '11';
  res.render('index', { title: 'Express', aloha : JSON.stringify(aloha) });
});

module.exports = router;
