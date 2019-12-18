#!/usr/bin/node
const http = require('http');
var optfile = require('./fs_read');
const fs = require('fs');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();
var server = http.createServer().listen(8000);
server.on('request',(req,res)=>{
    //获取图片
    if(req.url.split('/')[1] === 'images') {
        var photo = req.url.split('/')[2];
        optfile.readImg('../我的/images/'+photo, res);
    }
    //获取用户信息
    else if(req.url.split('=')[0]==='/users?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            con.query(`select * 
                       from users 
                       where userId = ${userId};`, (err, result) => {
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin": "*"});
            res.end(data.toString('utf8'));     
        })
    } 
    //修改用户昵称  
    else if(req.url==='/changename'){
        var obj="";
        var di='';
        req.on('data',function(data){
            obj+=data;
        })
        req.on('end',function(){
            var user = JSON.parse(obj);
            let promise01 = new Promise(resolve =>{//添加日记数据
                con.query('update users set userName=? where userId=?',[user.name,user.userId],(err, result) => {
                    result=[user.name,user.userId];
                    resolve(result);
                });
            }).then(value =>{
                // res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json"},{"Access-Control-Allow-Origin": "*"});
                var userInfo = JSON.stringify(value);
                res.end(userInfo); 
            });

        })
        res.end();    
    }  
    //修改用户所在城市
    else if(req.url==='/changeCity'){
        var obj="";
        var di='';
        req.on('data',function(data){
            obj+=data;
        })
        req.on('end',function(){
            var user = JSON.parse(obj);
            let promise01 = new Promise(resolve =>{
                con.query('update users set userCity=? where userId=?',[user.city,user.userId],(err, result) => {
                    result=[user.city,user.userId];
                    resolve(result);
                });
            }).then(value =>{
                // res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json"},{"Access-Control-Allow-Origin": "*"});
                var userInfo = JSON.stringify(value);
                res.end(userInfo); 
            });

        })
        res.end();    
    }  
    //修改用户简介
    else if(req.url==='/changeInfo'){
        var obj="";
        var di='';
        req.on('data',function(data){
            obj+=data;
        })
        req.on('end',function(){
            var user = JSON.parse(obj);
            //console.log(user);
            let promise01 = new Promise(resolve =>{
                con.query('update users set userIntro =? where userId=?',[user.info,user.userId],(err, result) => {
                    result=[user.info,user.userId];
                    resolve(result);
                });
            }).then(value =>{
                // res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json"},{"Access-Control-Allow-Origin": "*"});
                var userInfo = JSON.stringify(value);
                res.end(userInfo); 
            });

        })
        res.end();    
    } 
    //修改用户性别 
    else if(req.url==='/changeSex'){
        var obj="";
        var di='';
        req.on('data',function(data){
            obj+=data;
        })
        req.on('end',function(){
            var user = JSON.parse(obj);
            console.log(user);
            let promise01 = new Promise(resolve =>{//添加日记数据
                con.query('update users set userSex=? where userId=?',[user.sex,user.userId],(err, result) => {
                    result=[user.sex,user.userId];
                    resolve(result);
                });
            }).then(value =>{
                // res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json"},{"Access-Control-Allow-Origin": "*"});
                var userInfo = JSON.stringify(value);
                res.end(userInfo); 
            });

        })
        res.end();    
    } 
    //修改用户头像 
    else if(req.url==='/changePic'){
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
            //console.log(user);
            let promise01 = new Promise(resolve =>{//添加日记数据
                con.query('update users set userPic=? where userId=?',[di,user.userId],(err, result) => {
                    result=[di,user.userId];
                    resolve(result);
                });
            }).then(value =>{
                // res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json"},{"Access-Control-Allow-Origin": "*"});
                var userInfo = JSON.stringify(value);
                res.end(userInfo); 
            });

        })
        res.end();    
    }  
});


