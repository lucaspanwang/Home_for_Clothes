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

var server = http.createServer().listen(8081);
server.on('request',(req,res)=>{   
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    if(req.url==='/dd'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        var obj="";
        req.on('data',function(data){
            // console.log(data);
            obj+=data;
        })
        req.on('end',function(){
            var riji = JSON.parse(obj);
            for(var i =0;i<riji.files.length;i++){
                var path = '../我的/images/'+ riji.diaryId+i+riji.filesType[i];
                var base64 = riji.files[i].url.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
                var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
                fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
                    if(err){
                        console.log(err);
                    }else{
                       console.log('写入成功！');
                    }
                })
            }
            
            // let bitmap1 = Buffer.from(base64str, 'base64');//解码图片
            // fs.writeFileSync('end.jpg',bitmap1);
            console.log(riji);
            console.log(riji.filesType)
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
                //console.log(result);
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


