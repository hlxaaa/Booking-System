// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
// var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    check:function(req,res,next){
        var identity = req.query.identity;
        var no = req.query.no;
        var user =req.query.user;
        // console.log(identity);
        // console.log(no);
        // console.log(user);
        pool.getConnection(function(err, connection) {
            connection.query('select * from 订单表 where user=? and no=? and identity=?',[user,no,identity], function(err, result) {
                    if(result=='')
                    {
                        res.render('null');
                    }else{
                        res.render();
                    }
            });
            connection.release();
        });
    },
    delete:function(req,res,next){
        var id = req.query.id;
        console.log("user:"+id);
        pool.getConnection(function(err, connection) {
            connection.query('delete from buyer where id=?',id, function(err, result) {
                    res.render("null");
            });
            connection.release();
        });
    },
    buyer:function(req,res,next){
        var user = req.query.user;
        console.log("user:"+user);
        pool.getConnection(function(err, connection) {
            connection.query('select * from buyer where user=?',user, function(err, result) {
                res.render("buyer",{results:result,user:req.session.user.username});
            });
            connection.release();
        });
    },
    getOrder:function(req,res,next){
        var user = req.query.user;
        pool.getConnection(function(err, connection) {
            connection.query('select * from 订单表 where user=? order by id desc',user, function(err, result) {
                result.forEach(function(r){
                    r.startTime=r.startTime.substr(0,5);
                })
                if (!req.session.user) {
                    res.render("order",{results:result,user:''});
                }else{
                    res.render("order",{results:result,user:req.session.user.username});
                }
            });
            connection.release();
        });
    },
    buyTicket:function(req,res,next){
        var no = req.body.no;
        var user = req.body.user;
        // var name = req.body.name;
        // var identity = req.body.identity;
        var startPlace = req.body.startPlace;
        var endPlace = req.body.endPlace;
        var price = req.body.price;
        var date = req.body.date;
        var startTime = req.body.startTime;
        var startDate = req.body.startDate;
        var data = req.body.data;
        var count = req.body.count;
        var data2 = data.toString().split(",");
        var isHave = true;
        var r = new Array();

        console.log(user);
        console.log(no);
        console.log(startPlace);
        console.log(endPlace);
        console.log(price);
        console.log(date);
        console.log(startTime);
        console.log(startDate);

        pool.getConnection(function(err, connection) {
            
                for(var i =0;i<count*2;i=i+2){
                    console.log(data2[i]);
                    console.log(data2[i+1]);
                    // connection.query('select name from 订单表 where user=? and no=? and name=? and identity=?', [user,no,data2[i],data2[i+1]], function(err, result) {
                    //    if(result==""){
                    //         isHave = false;
                    //     }else{
                    //         isHave = true;
                    //         r.push(result[0].name); 
                    //     }
                    //     console.log("rrr:"+r);
                    // });

                    connection.query('insert 订单表(user,no,startPlace,endPlace,price,date,startTime,startDate,name,identity) values(?,?,?,?,?,?,?,?,?,?)', [user,no,startPlace,endPlace,price,date,startTime,startDate,data2[i],data2[i+1]], function(err, result) {
                        // console.log("1");  
                    });
                    connection.query('insert buyer(user,name,identity) values(?,?,?)', [user,data2[i],data2[i+1]], function(err, result) {
                        // console.log("1");  
                    });
                    connection.query('update info set leftTickets=leftTickets-1 where no=?', no, function(err, result) {
                        // console.log("2");
                    });
                }
            
            
            res.render("null");
            connection.release();
        });
    },
    reg:function(req,res,next){
        var user = req.body.user;
        var password1 = req.body.password;
        pool.getConnection(function(err, connection) {
            connection.query("select *from user where user=?", user, function(err, result) {
                if(result!="")
                {
                    res.render();
                }else
                {
                    connection.query($sql.insertUser, [user,password1], function(err, result) {
                        res.render("btn2",{user:user});
                    });
                }
            });
            
            connection.release();
        });
    },
    test:function(req,res,next){
        var user = req.body.user;
        var password1 = req.body.password;
        pool.getConnection(function(err, connection) {
            connection.query($sql.selectPassword, user, function(err, result) {
                var p2 = result[0].password;
                if(password1==p2)
                    res.render("btn2",{user:user});
            });
            connection.release();
        });
    },
    tryLogin:function(req,res,next){
        var user = req.query.user;
        var password = req.query.password;
        pool.getConnection(function(err, connection) {
            connection.query($sql.selectPassword, user, function(err, result) {
                // if(password==result[0].password)
                console.log('1');
                return true;
            });
            connection.release();
        });
    },
    search: function (req, res, next) {
        var start = req.body.start; // 为了拼凑正确的sql语句，这里要转下整数
        var end = req.body.end;
        var date = req.body.date;
        var date2 = new Date(date);
        var date1 = new Date();
        date1.setTime(date2.getTime()-1000*60*60*24);
        var date3 = new Date();
        date3.setTime(date2.getTime()+1000*60*60*24);
        date1 = date1.toLocaleDateString();
        date2 = date2.toLocaleDateString();
        date3 = date3.toLocaleDateString();

        pool.getConnection(function(err, connection) {
            connection.query($sql.search, [start,end,date], function(err, result) {
                result.forEach(function(r){
                    var a = "2017-01-01";
                    var b = new Date(a+" "+r.startTime);
                    var c = new Date(a+" "+r.endTime);
                    var d = (c-b)/1000;
                    var hours = parseInt(d/3600);
                    var mins = Math.round(60*(d/3600-hours));
                    r.useTime = hours+"小时"+mins+"分";

                    r.startTime=r.startTime.substr(0,5);
                    r.endTime=r.endTime.substr(0,5);
                })

                if(result==""){
                    if (!req.session.user) {
                        res.render('result',{result:'null',user:'',start:start,end:end,date1:date1,date2:date2,date3:date3});
                    }else{
                        res.render('result',{result:'null',user:req.session.user.username,start:start,end:end,date1:date1,date2:date2,date3:date3});
                    }
                }
                else {
                    if (!req.session.user) {
                        res.render('result', { results:result,date1:date1,date2:date2,date3:date3,result:'',user:'',start:start,end:end});
                    }else{
                        res.render('result', { results:result,date1:date1,date2:date2,date3:date3,result:'',user:req.session.user.username,start:start,end:end});
                    }
                }
            });
            connection.release();
        });
    },
    query4: function (req, res, next) {
        var start = req.query.start; // 为了拼凑正确的sql语句，这里要转下整数
        var end = req.query.end;
        var date = req.query.date;
        var date2 = new Date(date);
        var date1 = new Date();
        date1.setTime(date2.getTime()-1000*60*60*24);
        var date3 = new Date();
        date3.setTime(date2.getTime()+1000*60*60*24);
        date1 = date1.toLocaleDateString();
        date2 = date2.toLocaleDateString();
        date3 = date3.toLocaleDateString();

        pool.getConnection(function(err, connection) {
            connection.query($sql.search, [start,end,date], function(err, result) {
                // res.setHeader('Cache-Control','no-cache');

                result.forEach(function(r){
                    var a = "2017-01-01";
                    var b = new Date(a+" "+r.startTime);
                    var c = new Date(a+" "+r.endTime);
                    var d = (c-b)/1000;
                    var hours = parseInt(d/3600);
                    var mins = Math.round(60*(d/3600-hours));
                    r.useTime = hours+"小时"+mins+"分";

                    r.startTime=r.startTime.substr(0,5);
                    r.endTime=r.endTime.substr(0,5);
                })

                if(result==""){
                    if (!req.session.user) {
                        res.render('result',{result:'null',user:'',date1:date1,date2:date2,date3:date3,start:start,end:end});
                    }else{
                        res.render('result',{result:'null',user:req.session.user.username,date1:date1,date2:date2,date3:date3,start:start,end:end});
                    }
                }else{
                    if (!req.session.user) {
                        res.render('result', { results:result,date1:date1,date2:date2,date3:date3,result:'',user:'',start:start,end:end});
                    }else{
                        res.render('result', { results:result,date1:date1,date2:date2,date3:date3,result:'',user:req.session.user.username,start:start,end:end});
                    }
                    
                }
               
            });
            connection.release();
        });
    },
    selectInfo: function (req, res, next) {
        var no = req.body.no;
        console.log(no);
        // console.log(req.session.user.username);
        var date;
        var result2='';

        pool.getConnection(function(err, connection) {
            connection.query($sql.selectDate, no, function(err, result) {
                date = result[0].date.toLocaleDateString()
            });
            connection.release();
        });
        // console.log("username:"+req.session.user.username)
        if(req.session.user){
            pool.getConnection(function(err, connection) {
                connection.query('select *from buyer where user=?', req.session.user.username, function(err, result) {
                    if(result==''){
                        result2='';
                    }else{
                        result2=result;
                    }
                });
                connection.release();
            });
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.selectInfo, no, function(err, result) {

                result.forEach(function(r){
                    var a = "2017-01-01";
                    var b = new Date(a+" "+r.startTime);
                    var c = new Date(a+" "+r.endTime);
                    var d = (c-b)/1000;
                    var hours = parseInt(d/3600);
                    var mins = Math.round(60*(d/3600-hours));
                    r.useTime = hours+"小时"+mins+"分";

                    r.startTime=r.startTime.substr(0,5);
                    r.endTime=r.endTime.substr(0,5);
                })


                if (!req.session.user) {
                    res.render('buy', {results:result,date:date,user:'',results2:''} );
                }else{
                    res.render('buy', {results:result,date:date,user:req.session.user.username,results2:result2} );
                }
            });
            connection.release();
        });
    }
};
