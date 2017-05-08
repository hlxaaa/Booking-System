var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.user){
        res.render('btn',{user:''});
    }else{
        res.render('btn',{user:req.session.user.username});
    }
});

router.get('/delete',function(req,res,next){
    userDao.delete(req,res,next);
})

router.get('/buyer',function(req,res,next){
    userDao.buyer(req,res,next);
})



// router.get('/btn', function(req, res, next) {
//   res.render('btn');
// });

router.get('/result',function(req,res,next){
	res.render('result', { no: 't1',startAndEnd: 't1',fromAndTo: 't1',time: 't1',price: 't1',left: 't1' });
})

router.post('/search',function(req,res,next){
	if(!req.body) return res.sendStatus(400);
    userDao.search(req,res,next);
})

// router.get('/*', function(req, res, next){ 
//   res.setHeader('Last-Modified', (new Date()).toUTCString());
//   next(); 
// });


router.get('/test',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    res.header("Cache-Control", "no-cache");
    res.header("Pragma", "no-cache");
     res.setTimeout(1000,function(){
           // res.render("null");
        });
    userDao.query4(req,res,next);
})

router.post('/buy',function(req,res,next){
    // console.log('sss:'+req.body.no);
    if(!req.body) return res.sendStatus(400);
    // res.render('buy');
    userDao.selectInfo(req,res,next);
})

router.post('/login-user',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    var user = {'username':req.body.user};  
    req.session.user = user;  
    
    // console.log('ssss:'+req.body.user);
    // console.log('ssss:'+req.body.password);
    // userDao.tryLogin(req,res,next);
    // userDao.test(req,res,next);
    userDao.test(req,res,next);
})

router.post('/login-reg',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    console.log('ssss:'+req.body.user);
    console.log('ssss:'+req.body.password);
    var user = {'username':req.body.user};  
    req.session.user = user; 
    // userDao.tryLogin(req,res,next);
    // userDao.test(req,res,next);
    userDao.reg(req,res,next);
})

router.post('/login-out',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    // userDao.tryLogin(req,res,next);
    // userDao.test(req,res,next);
    delete req.session.user;
    res.render("btn3");
})

router.post('/buyTicket',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    // console.log('1');
    // userDao.tryLogin(req,res,next);
    // userDao.test(req,res,next);
    userDao.buyTicket(req,res,next);
})

router.get('/order',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    // console.log("1111");
    userDao.getOrder(req,res,next);
})

router.get('/check',function(req,res,next){
    if(!req.body) return res.sendStatus(400);
    console.log("1111");
    userDao.check(req,res,next);
})

module.exports = router;
