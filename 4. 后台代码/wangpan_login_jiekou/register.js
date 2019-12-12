#!/usr/bin/node

const http = require('http');
const fs = require('fs');
var optfile = require('./fs_read');
var qs=require('querystring');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();
let server = http.createServer();

var userPho = '122';

let promise = new Promise(userNum = function(resolve){
    //查询数据库数据获得用户信息
    con.query(`select * from users`, (err, result) => {
        var userNum = result.length;
        var userDB = [];
        for(var i=0;i<userNum;i++){
            userDB.push(result[i]);
        }
        resolve(userDB);
    })
})
    .then(value =>{
            //创建服务
            server.on('request',(req,res)=>{
                if(req.url==='/login'){
                    res.setHeader("Access-Control-Allow-Origin", "*"); 
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify(value));   
                }
            })
    })

server.on('request',(req,res)=>{
    if(req.url==='/register'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        req.on('data',function(data){
            console.log('接收：'+data);
            userPho=JSON.parse(data).userPho;
            userPwd=JSON.parse(data).userPwd;

            //将接收到的数据发送到数据库
            // let promise34 = new Promise(resolve =>{
            //     con.query('insert into users values(?,?,?,?,?,?,?,?)',[value,it.userId,it.articleId,it.reviewContent,it.reviewTime],(err, result) => {
            //         result=[value,it.userId,it.articleId,it.reviewContent,it.reviewTime];
            //         resolve(result);
            //     });
            // }).then(value =>{
            //     res.writeHead(200, {"Content-type":"application/json"});
            //     review = JSON.stringify(value);
            //     res.end(review); 
            // });

        })
        res.end();
    }
})


server.listen(8092);