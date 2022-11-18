var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/plot_nft', function(req, res) {
  console.log(req.body);
  res.send({'message': 'success'});
});



module.exports = router;