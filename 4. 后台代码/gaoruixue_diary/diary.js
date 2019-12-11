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
     //获取图片
    if(req.url.split('/')[1] === 'images') {
        var photo = req.url.split('/')[2];
        optfile.readImg('../我的/images/'+photo, res);
    }
    //获得日记数据
    else if(req.url === '/diary'){
        let promise = new Promise(resolve =>{
            con.query(`select * from diary order by diaryTime desc;`, (err, result) => {
                for(var i=0;i<result.length;i++){
                    dimg = result[i].dimg.split('+');
                    result[i].dimg = dimg;
                }
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin": "*"});
            res.end(data.toString('utf8'));     
        })
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
    //获取指定用户的日记数据
    else if(req.url.split('=')[0]==='/diary?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            con.query(`select diary.diaryId,diary.diaryContent,diary.dimg,diary.diaryTime,users.userPic 
                       from diary,users 
                       where diary.userId = users.userId and diary.userId = ${userId}
                       order by diaryTime desc;`, (err, result) => {
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
            res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin": "*"});
            res.end(data.toString('utf8'));     
        })
    }
    //添加日记数据  
    else if(req.url==='/diaryAdd'){
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
            let promise01 = new Promise(resolve =>{//添加日记数据
                con.query('insert into diary values(?,?,?,?,?)',[riji.diaryId,riji.userId,riji.value,di,riji.diarytime],(err, result) => {
                    result=[riji.diaryId,riji.userId,riji.value,di,riji.diarytime];
                    resolve(result);
                });
            }).then(value =>{
                //res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin": "*"});
                diary = JSON.stringify(value);
                res.end(diary); 
            });

        })
        res.end();    
    }
    //删除日记数据
    else if(req.url==='/diaryDel'){
        var obj="";
        var di='';
        req.on('data',function(data){
            obj+=data;
        })
        req.on('end',function(){//获取要删除的日记Id
            var riji = JSON.parse(obj);
            console.log(riji);
            let promise01 = new Promise(resolve =>{//删除日记
                con.query('delete from diary where diaryId = ?', [riji.diaryId], function(err, result){
                      if(err) {
                        console.error(err.message);
                        process.exit(1);
                      }
                      console.log(result);
                    });
                    
            }).then(value =>{
                //res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin": "*"});
                diary = JSON.stringify(value);
                res.end(diary); 
            });

        })
        res.end();    
    }
    
});


