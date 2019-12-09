#!/usr/bin/node
const http = require('http');
var optfile = require('./fs_read');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();

var server = http.createServer().listen(8081);
server.on('request',(req,res)=>{   
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    if(req.url==='/dd'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        var obj="";
        req.on('data',function(data){
            obj+=data;
            console.log('接收：'+data)
        })
        res.end();
    }
    if(req.url === '/diary'){
        let promise = new Promise(resolve =>{
            //查询数据库数据获得用户信息
            con.query(`select * 
                       from diary;`, (err, result) => {
                for(var i=0;i<result.length;i++){
                    dimg = result[i].dimg.split('+');
                    result[i].dimg = dimg;
                }
                console.log(result);
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取用户信息
    if(req.url.split('=')[0]==='/users?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            //查询数据库数据获得用户信息
            con.query(`select * 
                       from users 
                       where userId = ${userId};`, (err, result) => {
                console.log(result);
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取日记数据
    if(req.url.split('=')[0]==='/diary?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            //查询数据库数据获得日记信息
            con.query(`select diary.diaryId,diary.diaryContent,diary.dimg,diary.diaryTime,users.userPic 
                       from diary,users 
                       where diary.userId = users.userId and diary.userId = ${userId};`, (err, result) => {
                for(var i=0;i<result.length;i++){
                    dimg = result[i].dimg.split('+');
                    result[i].dimg = dimg;
                }
                console.log(result);
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取图片
    if(req.url.split('/')[1] === 'images') {
        var photo = req.url.split('/')[2];
        optfile.readImg('../我的/images/'+photo, res);
        console.log("主程序结束");
    }
    
});


