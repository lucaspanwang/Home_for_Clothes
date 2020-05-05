var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.end('hello world')
  res.render('index', { title: 'Express' });
});
router.get('/user',function(req,res,next){
  res.end('hello world')
})

module.exports = router;
