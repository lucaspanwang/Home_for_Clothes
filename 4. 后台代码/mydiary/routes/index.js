var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');

const fs = require('fs');
var con = mysql.createConnection(dbconfig);// 创建连接
    con.connect();//链接

//获取图片
router.get('/images/:photo', function(req, res) {
  var photo = req.params.photo;
  optfile.readImg('../我的/images/'+photo, res);

})
//获取用户信息
router.get('/users', function(req, res) {
  var userId = req.query.userId;
  console.log(userId);
  con.query(`select * 
            from users 
            where userId = ${userId};`, (err, result) => {
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(result);
    }
  })
})
//修改用户昵称 
router.post('/changename', function(req, res) {
  var obj="";
  req.on('data',function(data){
      obj+=data;
  })

  req.on('end',function(){
      var user = JSON.parse(obj);
      con.query('update users set userName=? where userId=?',[user.name,user.userId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[user.name,user.userId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})
//修改用户所在城市
router.post('/changeCity', function(req, res) {
  var obj="";
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){
      var user = JSON.parse(obj);
      con.query('update users set userCity=? where userId=?',[user.city,user.userId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[user.city,user.userId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})
//修改用户简介
router.post('/changeInfo', function(req, res) {
  var obj="";
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){
      var user = JSON.parse(obj);
      con.query('update users set userIntro =? where userId=?',[user.info,user.userId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[user.info,user.userId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})
//修改用户性别 
router.post('/changeSex', function(req, res) {
  var obj="";
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){
      var user = JSON.parse(obj);
      con.query('update users set userSex=? where userId=?',[user.sex,user.userId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[user.sex,user.userId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})
//修改用户头像 
router.post('/changePic', function(req, res) {
  var obj="";
  var di='';

  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){
      var user = JSON.parse(obj);
      var path = '../我的/images/'+ user.userId+'.jpg';
      di = di+path.slice(3);
      var base64 = user.pic.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
      fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
          if(err){
              console.log(err);
          }else{
              console.log('写入成功！');
          }
      })    
      con.query('update users set userPic=? where userId=?',[di,user.userId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[di,user.userId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})
//获得日记数据
router.get('/diary', function(req, res) {

  con.query(`select * from diary order by diaryTime desc;`, (err, result) => {
    if(err){
      console.log(err);
    }else{
      for(var i=0;i<result.length;i++){
          dimg = result[i].dimg.split('+');
          result[i].dimg = dimg;
      }
      console.log(result);
      res.send(result);
    }
  })  
});
//获取指定用户的日记数据
router.get('/diary/:userId', function(req, res) {
  var userId = req.params.userId;
  console.log(userId)
  con.query(`select diary.diaryId,diary.diaryContent,diary.dimg,diary.diaryTime,users.userPic 
              from diary,users 
              where diary.userId = users.userId and diary.userId = ${userId}
              order by diaryTime desc;`, (err, result) => {
      if(err){
        console.log(err);
      }else{
        for(var i=0;i<result.length;i++){
          dimg = result[i].dimg.split('+');
          result[i].dimg = dimg;
        }
        console.log(result);  
        res.send(result);
      }    
  })  
})
//添加日记数据
router.post('/diaryAdd', function(req, res) {
  var obj="";
  var di='';
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){//获取图片存入
      var riji = JSON.parse(obj);
      for(var i =0;i<riji.files.length;i++){
          var path = '../我的/images/'+ riji.diaryId+i+riji.filesType[i];
          if(i<riji.files.length-1){
              di = di+path.slice(3)+'+';
          }else{
              di = di+path.slice(3);
          }
          var base64 = riji.files[i].replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
          var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
          fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
              if(err){
                  console.log(err);
              }else{
                  console.log('写入成功！');
              }
          })    
      }
      
      con.query('insert into diary values(?,?,?,?,?)',[riji.diaryId,riji.userId,riji.value,di,riji.diarytime],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[riji.diaryId,riji.userId,riji.value,di,riji.diarytime];
            console.log(result);
            // res.send(result);
          }
      })     
  })
  res.end();  
});
//删除日记数据
router.post('/diaryDel', function(req, res) {
  var obj="";
  var di='';
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){//获取要删除的日记Id
      var riji = JSON.parse(obj);
      console.log(riji);
      
      con.query('delete from diary where diaryId = ?', [riji.diaryId], function(err, result){
        if(err) {
          console.error(err.message);
          process.exit(1);
        }
        console.log(result);
        // res.send(result);
      });
  })
  res.end();
})
//添加反馈意见
router.post('/fankui', function(req, res) {
  var obj="";
  var fb='';
  var huifu=null;
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){//获取图片存入
      var fankui = JSON.parse(obj);
      for(var i =0;i<fankui.files.length;i++){
          var path = '../我的/images/'+ fankui.fbId+i+fankui.filesType[i];
          if(i<fankui.files.length-1){
              fb = fb+path.slice(3)+'+';
          }else{
              fb = fb+path.slice(3);
          }
          var base64 = fankui.files[i].replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
          var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
          fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
              if(err){
                  console.log(err);
              }else{
                  console.log('写入成功！');
              }
          })    
      }
      
      con.query('insert into feedback values(?,?,?,?,?,?,?,?)',[fankui.fbId,fankui.userId,fankui.value,fb,fankui.fbtime,fankui.fbtel,huifu,huifu],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[fankui.fbId,fankui.userId,fankui.value,fb,fankui.fbtime,fankui.fbtel,huifu,huifu];
            console.log(result);
            // res.send(result);
          }
      })     
  })
  res.end();  
});
//获取指定用户的反馈意见
router.get('/fankui/:userId', function(req, res) {
  var userId = req.params.userId;
  console.log(userId)
  con.query(`select feedback.fbId,feedback.fbContent,feedback.fbimg,feedback.fbTime,feedback.huifu,feedback.huiTime,feedback.fbtel
              from feedback,users 
              where feedback.userId = users.userId and feedback.userId = ${userId}
              order by fbTime desc;`, (err, result) => {
      if(err){
        console.log(err);
      }else{
        for(var i=0;i<result.length;i++){
          fbimg = result[i].fbimg.split('+');
          result[i].fbimg = fbimg;
        }
        console.log(result);  
        res.send(result);
      }    
  })  
})

//获取所有用户的反馈意见
router.get('/fankuiall', function(req, res) {
  con.query(`select feedback.*,users.userName,users.userPic
              from feedback,users
              where users.userId = feedback.userId
              order by fbTime desc;`, (err, result) => {
      if(err){
        console.log(err);
      }else{
        for(var i=0;i<result.length;i++){
          if(result[i].huifu){
            result[i].fbimg='已回复'
          }else{
            result[i].fbimg='待回复'
          }
        } 
        console.log(result); 
        res.send(result);
      }    
  })  
})
//获取指定的反馈意见
router.get('/fankuiall/:fbId', function(req, res) {
  var fbId = req.params.fbId;
  con.query(`select feedback.*,users.userName,users.userPic
              from feedback,users
              where feedback.userId = users.userId and feedback.fbId = '${fbId}';`, (err, result) => {
      if(err){
        console.log(err);
      }else{
        for(var i=0;i<result.length;i++){
          if(result[i].huifu){
            result[i].fbimg='已回复'
          }else{
            result[i].fbimg='待回复'
          }
        } 
        console.log(result); 
        res.send(result);
      }    
  })  
})
//添加回复
router.post('/fankuiadd', function(req, res) {
  var obj="";
  req.on('data',function(data){
      obj+=data;
  })
  req.on('end',function(){
      var fb = JSON.parse(obj);
      con.query('update feedback set huifu=? where fbId=?',[fb.huifu,fb.fbId],(err, result) => {
          if(err){
            console.log(err);
          }else{
            result=[fb.huifu,fb.fbId];
            console.log(result);
            // res.send(result);
          }
      });
  })
  res.end(); 
})


module.exports = router;
