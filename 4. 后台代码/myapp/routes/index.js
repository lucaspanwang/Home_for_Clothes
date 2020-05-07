var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接

//穿搭模块
var msg ;
//用户基本数据
router.post('/react', function(req, res, next) {
  var user  = req.body.userId;
  con.query("select * from users,clothing where clothing.userId = users.userId and users.userId=?;",[user],function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result)
        res.send(result);
      }
     })
})
//天气预报
router.post('/weather', function(req, ress, next) {
  var userCity  = req.body.userCity;
  var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+userCity+'&appid=24444633&appsecret=cgkFXVq9'
  http.get(global.encodeURI(addr), (res) => {
    var obj='';
    res.on('data', (data) => {
      obj+=data;
    });
    res.on('end',()=>{
      ress.send(obj);
    })
  })
})
//美妆默认设置
router.post('/mote_style', function(req, res, next) {
  var pretty = JSON.parse(obj);
  con.query('insert into mote_style values(?,?,?,?,?)',[pretty.id,pretty.index,pretty.index2,pretty.index3,pretty.color],(err, result) => {
      if(err){
        console.log(err);
      }
    })     
  res.end(); 
})
//美妆修改
router.post('/update_mote_style', function(req, res, next) {
  console.log(req.body)
  con.query('update mote_style set index1=?,index2=?,index3=?,color=? where userId=?;',[req.body.index,req.body.index2,req.body.index3,req.body.color,req.body.id,],function(err, result){
    if(err){
      console.log(err);
    }
  }) 
  res.end(); 
})
//得到美妆数据
router.post('/get_mote_style', function(req, res, next) {
  var user  = req.body.userId;
  if(user.indexOf('&')){
    user = user.split('&')[0]
  }
  console.log(user)
  con.query("select * from mote_style where userId=?;",[user],function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log('mote:'+JSON.stringify(result))
        res.send(JSON.stringify(result));
      }
  })
})
//获取图片
router.get('/images/:photo', function(req, res) {
  var photo = req.params.photo;
  optfile.readImg('../我的/images/'+photo, res);
})
//接收数据
router.post('/pp', function(req, res, next) {
  msg = req.body.msg;
  console.log(msg)
})
//向整理箱发送数据(点击衣物跳转用)
router.post('/pp2', function(req, res, next) {
  console.log('发送给整理箱了'+msg)
  res.setHeader("Access-Control-Allow-Credentials",true)
  res.setHeader("Access-Control-Allow-Origin", "*");
  if(msg){
      res.send(JSON.stringify());
  }else{
      res.send(JSON.stringify([]))
  }
})
module.exports = router;
