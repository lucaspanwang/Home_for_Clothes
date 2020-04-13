var express = require('express');
var router = express.Router();
const fs = require('fs');
const qs = require('querystring');
const read = require('./fs_read')

var mysql = require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var con = mysql.createConnection(dbconfig);// 创建连接
    con.connect();//链接

//读取图片信息
router.get('/images', function(req, res, next) {
  var photo = req.url.split('/')[2];
  read.readImg('../public/images/'+photo, res);
  next();
});

//读取文章信息
router.get('/article', function(req, res, next) {
  function readImg(result){//读取文章内的图片
    var cimg;
    for(var i=0;i<result.length;i++){
      if(result[i].cimg.length !== 0){
        cimg = result[i].cimg.split('+');
        result[i].cimg = cimg;
      }
    }
    res.send(result);
  }
  if(req.query.userId){//读取某用户的文章信息
    con.query('select community.*,users.userName,users.userPic from community,users where community.userId=users.userId and community.userId=?',[req.query.userId], (err, result) => {
      if(err) res.send(err)
      else readImg(result);
    })
  }else if(req.query.articleId){//读取某文章的信息
    con.query('select community.*,users.userName,users.userPic from community,users where community.userId=users.userId and community.articleId=?',[req.query.articleId], (err, result) => {
      if(err) res.send(err)
      else readImg(result);
    })
  }else{//读取所有文章
    con.query(`select community.*,users.userName,users.userPic from community,users where community.userId=users.userId`, (err, result) => {
      if(err) res.send(err)
      else readImg(result);
    });
  }
});

//添加文章---还需修改
router.post('/articleAdd', function(req, res, next) {
  //获取 req.body
  var obj = '';
  var addCimg = '';
  req.on('data',function(data){
    obj += data;
  });
  req.on('end',function(){
    var item = JSON.parse(obj);
    new Promise(resolve =>{
      con.query('select * from community', function(err, result){
        if(err){
          res.send(err);
        }else{
          var num;
          if(result[0].rev === 0){
            num=999999;
          }else{
            num = JSON.stringify(result[0].articleId).replace(/[^0-9]/ig,"")-1;
          }
          resolve('Art'+num);
        }
      })
    }).then(value =>{
      for(var i=0;i<item.cimg.length;i++){
        var path = '../public/images/'+value+'-'+i+item.cimgName[i];
        if(i===0){
          addCimg += path.slice(5);
        }else{
          addCimg += '+'+path.slice(5);
        }
        var base64 = item.cimg[i].replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64, 'base64'); 
        fs.writeFile(path,dataBuffer,function(err){
          if(err){
            console.log(err);
          }else{
            console.log('图片写入成功！');
          }
        })
      }
      con.query('insert into community values(?,?,?,?,?,?,?,?)',[value,item.userId,item.content,item.time,0,0,0,addCimg],(err, result) => {
        if(err){
          res.send(err);
        }else{
          console.log("添加文章"+value);
          res.send(result);
        }
      });
    })
  })
});

//删除文章---还需修改
router.post('/articleDelete', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  con.query('select * from community where articleId=?',[it.articleId], (err, result) => {
    if(err){
      res.send(err);
    }else{
      var cimg;
      for(var i=0;i<result.length;i++){
        if(result[i].cimg.length !== 0){
          cimg = result[i].cimg.split('+');
          for(var j=0;j<cimg.length;j++){
              fs.unlinkSync('../我的'+cimg[j]);
          }
        }
      }
      res.send(result);
    }
  })
  con.query('delete from saveTable where articleId=?',[it.articleId],(err, result) => {
    if(err) res.send(err)
    else{
      res.send(result);
    }
  });
  con.query('delete from agreeTable where articleId=?',[it.articleId],(err, result) => {
    if(err) res.send(err)
    else{
      res.send(result);
    }
  });
  con.query('delete from reviewTable where articleId=?',[it.articleId],(err, result) => {
    if(err) res.send(err)
    else{
      res.send(result);
    }
  });
  con.query('delete from community where articleId=?',[it.articleId],(err, result) => {
    if(err) res.send(err)
    else{
      res.send(result);
    }
  });
});

//读取所有官方消息
router.get('/office', function(req, res, next) {
  con.query(`select * from office order by offTime desc`, (err, result) => {
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
});

//添加官方消息---还需修改
router.post('/officeAdd', function(req, res, next) {
  var obj = '';
  req.on('data',function(data){
    obj += data;
  });
  req.on('end',function(){
    var item = JSON.parse(obj);
    new Promise(resolve =>{
      con.query('select * from office order by offTime desc', function(err, result){
        if(err){
          res.send(err);
        }else{
          var num;
          if(result[0].rev === 0){
            num=999999;
          }else{
            num = JSON.stringify(result[0].offId).replace(/[^0-9]/ig,"")-1;
          }
          resolve('Off'+num);
        }
      })
    }).then(value =>{
      con.query('insert into office values(?,?,?,?)',[value,item.time,item.content,item.city],(err, result) => {
        if(err){
          res.send(err);
        }else{
          res.send(result);
        }
      });
    })
  })
});

//删除官方消息---还需修改
router.post('/officeDelete', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  con.query('delete from office where offId=?',[it.offId],(err, result) => {
    if(err){
      res.send(err);
    }else{
      console.log('删除官方消息'+it.offId);
      res.send(result);
    }
  });
});

//读取评论信息---消息页添加内容之后需要继续添加
router.get('/review', function(req, res, next) {
  if(req.query.articleId){//读某文章的评论消息
    con.query('select reviewTable.*,users.userName,users.userPic from reviewTable,users where reviewTable.userId=users.userId and reviewTable.articleId=?',[req.query.articleId], (err, result) => {
      if(err) res.send(err)
      else{
        res.send(result);
      }
    })
  }else{//读取所有评论信息
    con.query(`select * from reviewTable`, (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    })
  }
});

//添加评论---还需修改
router.get('/reviewAdd', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  new Promise(resolve =>{
    con.query('select *,count(reviewId) rev from reviewTable', function(err, result){
      if(err) res.send(err);
      else{
        var num;
        if(result[0].rev === 0){
          num=4999999;
        }else{
          num = JSON.stringify(result[0].reviewId).replace(/[^0-9]/ig,"")-1;
        }
        con.query('select count(reviewId) review from reviewTable where articleId=?',[it.articleId],function(err, result){
          if(err) res.send(err);
          resolve(["Re"+num,JSON.parse(JSON.stringify(result))[0].review]);
        });
      }
    })
  }).then(value =>{
    con.query('update community set review=? where articleId=?', [Number(value[1])+1,it.articleId], function(err, result){
      if(err) res.send(err)
      else res.send(result);
    });//文章表更新数据
    con.query('insert into reviewTable values(?,?,?,?,?)',[value[0],it.userId,it.articleId,it.reviewContent,it.reviewTime],(err, result) => {
      if(err) res.send(err);
      else{
        result=[value,it.userId,it.articleId,it.reviewContent,it.reviewTime];
        res.send(result);
      }
    });
  });
});

//删除评论---后期添加
router.get('/reviewDelete', function(req, res, next) {
});

//读取收藏表的信息---消息页添加被收藏
router.get('/collect', function(req, res, next) {
  con.query('select * from saveTable where userId=?',[req.query.userId], (err, result) => {
    if(err) res.send(err);
    else res.send(result);
  })
});

//收藏文章---还需修改
router.post('/collectAdd', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  new Promise(resolve =>{
    con.query('select count(userId) save from saveTable where articleId=?',[it.articleId],function(err, result){
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].save);
      }
    });
  }).then(value =>{
    con.query('update community set save=? where articleId=?', [Number(value)+1,it.articleId], function(err, result){
      if(err) res.send(err);
      else{
        res.send(result);
      }
    });//文章表更新数据
    con.query('insert into saveTable values(?,?)',[it.userId,it.articleId],(err, result) => {
      if(err) res.send(err);
      else{
        result=[it.userId,it.articleId];
        res.send(result);
      }
    });//收藏表添加数据
  });
});

//取消收藏---还需修改
router.post('/collectDelete', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  new Promise(resolve =>{
    con.query('select count(userId) save from saveTable where articleId=?',[it.articleId],function(err, result){
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].save);
      }
    });
  }).then(value =>{
    con.query('update community set save=? where articleId=?', [Number(value)-1,it.articleId], function(err, result){
      if(err) res.send(err);
      else{
        res.send(result);
      }
    });//文章表更新数据
    con.query('delete from saveTable where userId=? and articleId=?',[it.userId,it.articleId],(err, result) => {
      if(err) res.send(err);
      else{
        result=[it.userId,it.articleId];
        res.send(result);
      } 
    });//收藏表删除数据
  });
});

//读取点赞表的信息---消息页添加被点赞
router.get('/agree', function(req, res, next) {
  var it = qs.parse(req.url,"?",null,{maxKeys:2});
  var id = it.userId;
  con.query('select * from agreeTable where userId=?',[id], (err, result) => {
    if(err) res.send(err);
    else{
      res.send(result);
    }
  })
});

//文章点赞---还需修改
router.post('/agreeAdd', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  new Promise(resolve =>{
    con.query('select count(userId) agree from agreeTable where articleId=?',[it.articleId],function(err, result){
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].agree);
      }
    });
  }).then(value =>{
    con.query('update community set agree=? where articleId=?', [Number(value)+1,it.articleId], function(err, result){
      if(err) res.send(err);
      else{
        res.send(result);
      }
    });//文章表更新数据
    con.query('insert into agreeTable values(?,?)',[it.userId,it.articleId],(err, result) => {
      if(err) res.send(err);
      else{
        result=[it.userId,it.articleId];
        res.send(result);
      }
    });//点赞表添加数据
  });
});

//取消点赞---还需修改
router.post('/agreeDelete', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  new Promise(resolve =>{
    con.query('select count(userId) agree from agreeTable where articleId=?',[it.articleId],function(err, result){
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].agree);
      }
    });
  }).then(value =>{
    con.query('update community set agree=? where articleId=?', [Number(value)-1,it.articleId], function(err, result){
      if(err) res.send(err);
      else{
        res.send(result);
      }
    });//文章表更新数据
    con.query('delete from agreeTable where userId=? and articleId=?',[it.userId,it.articleId],(err, result) => {
      if(err) res.send(err);
      else{
        result=[it.userId,it.articleId];
        res.send(result);
      }
    });//点赞表删除数据
  });
});

//读取关注表的信息---消息页添加被关注，个人页获取关注/粉丝
router.get('/care', function(req, res, next) {
  var it = qs.parse(req.url,"?",null,{maxKeys:2});
  if(Object.keys(it)[1] === 'userId'){
    con.query('select * from care where userId=?',[it.userId], (err, result) => {
      if(err) res.send(err);
      else{
        res.send(result);
      }
    })
  }else if(Object.keys(it)[1] === 'careId'){
    con.query('select * from care where careId=?',[it.careId], (err, result) => {
      if(err) res.send(err);
      else{
        res.send(result);
      }
    })
  }else{
      res.statusCode = 404;
      res.end('404 Error, resource not found!');
  }
});

//关注其他用户---还需修改
router.post('/careAdd', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  con.query('insert into care values(?,?)',[it.userId,it.careId],(err, result) => {
    if(err) res.send(err);
    else{
      result=[it.userId,it.careId];
      res.send(result);
    }
  });//关注表添加数据
});

//取消关注---还需修改
router.post('/careDelete', function(req, res, next) {
  var it = qs.parse(req.url.split('?')[1]);
  con.query('delete from care where userId=? and careId=?',[it.userId,it.careId],(err, result) => {
    if(err) res.send(err);
    else{
      result=[it.userId,it.careId];
      res.send(result);
    }
  });//关注表删除数据
});

//读取某用户个人信息
router.get('/users', function(req, res, next) {
  con.query('select * from users where users.userId=?',[req.query.userId], (err, result) => {
    if(err) res.send(err);
    else{
      res.send(result);
    }
  })
});

//读取用户其他数据发帖/衣服/粉丝/关注数量信息
router.get('/detail', function(req, res, next) {
  var it = qs.parse(req.url,"?",null,{maxKeys:2});
  var id = it.userId;
  var count = [];
  new Promise(resolve =>{
    con.query('select count(articleId) countArt from community where community.userId=?',[id], (err, result) => {
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].countArt)
      }
    });//发帖
  }).then(value =>{count.push(value)});
  new Promise(resolve =>{
    con.query('select count(cloId) countClo from clothing where clothing.userId=?',[id], (err, result) => {
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].countClo)
      }
    });//衣服
  }).then(value =>{count.push(value)});
  new Promise(resolve =>{
    con.query('select count(careId) countUser from care where care.userId=?',[id], (err, result) => {
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].countUser)
      }
    });//关注
  }).then(value =>{count.push(value)});
  new Promise(resolve =>{
    con.query('select count(userId) countCare from care where care.careId=?',[id], (err, result) => {
      if(err) res.send(err);
      else{
        resolve(JSON.parse(JSON.stringify(result))[0].countCare)
      }
    });//粉丝
  }).then(value =>{
      count.push(value);
      res.send(count);
  });
});

//读取用户衣物信息(只获取某用户的)
router.get('/clothing', function(req, res, next) {
  con.query('select * from clothing where userId=?',[req.query.userId],(err,result)=>{
    if(err) res.send(err);
    else{
      res.send(result);
    }
  })
});

module.exports = router;
