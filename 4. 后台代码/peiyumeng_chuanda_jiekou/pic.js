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
//先假定用户id为122
var user = '122';
//获取用户衣物信息
let promise = new Promise(resolve =>{
    //读取用户衣物信息
    con.query(`select * from clothing where userId=${user}`, (err, result) => {
        resolve(result[0])
    })
    console.log(result[0]);
})
    .then(value =>{
            //创建服务
            console.log(value)
            var p = '../'+value.
            module.exports = http.createServer((req,res)=>{ 
                if (req.url != '/favicon.ico') {
                    optfile.readImg('../'+value.cloPic);
                    console.log("主程序结束");
                }
            })
    })
