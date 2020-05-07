var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
// const http = require('http');
// const fs = require('fs');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//注册
router.post('/register', function(req, res, next) {
  console.log('lianjie????')
  var con=mysql.createConnection(dbconfig);// 创建连接
  con.connect();//链接
  con.query(`select * from users`,function(err,result){//查询
    console.log('result:'+result)
      var userNum = result.length;
      var userDB = [];
      for(var i=0;i<userNum;i++){
          userDB.push(result[i]);
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      var obj = '';
      var IdDB = [];
      var newId = 20190002;
      for(var i=0;i<userNum;i++){
        var tempId = userDB[i].userId;
        tempId = parseInt(tempId);
        IdDB.push(tempId);
      }
      console.log(IdDB);//旧
      for(var i=0;i<userNum;i++){
          if(IdDB[i]>=newId)
              newId = IdDB[i]+1;
      }
      IdDB.push(newId);
      req.on('data',function(data){
        obj += data;//data就是传过来的数据
      });                
      req.on('end',function(){
        var item = JSON.parse(obj); 
        console.log('item'+item)
        userPho=item.userPho.replace(/\s*/g,'');
        userPwd=item.userPwd;
        userName=item.userName;
        userSex=item.userSex;
        userCity=item.userCity;
        path= '../我的/images/'+newId+'.'+item.picData.split('/')[1].split(';')[0];
        userPic = '我的/images/'+newId+'.'+item.picData.split('/')[1].split(';')[0];
        //设置图片
        var base64 = item.picData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64, 'base64'); 
        fs.writeFile(path,dataBuffer,function(err){
            if(err){console.log(err);
            }else{console.log('写入成功！');}
        });        
        console.log(userPho);
        console.log(userPwd);
        console.log(userName);
        console.log(userSex);
        console.log(userCity);
    });
 });
});

//穿搭
router.post('/aa', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.on('data',function(data){
      user=JSON.parse(data).userId
  })
  res.end();//接收传过来的用户id
  console.log(user)
    con.query(`select * from users,clothing where clothing.userId = users.userId and users.userId=${user}`, (err, result) => {
      if(result==''){//没查到
          var oo={};
          con.query(`select * from users where users.userId=${user}`, (err, result) => {//找到该用户
              oo.userId = result[0].userId
              oo.userCity = result[0].userCity;
              var arr = new Array();
              arr.push(oo)
              console.log(arr);//id+city
          })        
      }else{
          console.log('yes'+result)
          // resolve(result)
      }
      var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+value[0].userCity+'&appid=24444633&appsecret=cgkFXVq9'
      http.get(global.encodeURI(addr), (res) => {
      var obj='';
      res.on('data', (data) => {
               obj+=data;
      });
      res.on('end',()=>{
               var arr=[...value,JSON.parse(obj)];
              resolve(arr)
      })
    })
  })
})
module.exports = router;
