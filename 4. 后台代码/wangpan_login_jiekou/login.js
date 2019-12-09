#!/usr/bin/node

const http = require('http');

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


    server.listen(8082);