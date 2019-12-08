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

//先假定用户id为111
var user = '122';

server.on('request',(req,res)=>{
    if(req.url==='/aa'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        req.on('data',function(data){
            user=data.toString('utf8')
        })
        res.end();
    }
    // console.log(JSON.parse(user))
})
.then(()=>{
    return new Promise(resolve =>{
        //查询数据库数据获得用户信息
        con.query(`select * from users,clothing where clothing.userId = users.userId and clothing.userId=${user}`, (err, result) => {
            resolve(result)
        })
    })
})

//获取天气预报
// let promise = new Promise(resolve =>{
//     //查询数据库数据获得用户信息
//     con.query(`select * from users,clothing where clothing.userId = users.userId and clothing.userId=${user}`, (err, result) => {
//         console.log(result)
//         resolve(result)
//     })
// })
    .then(value =>{
        console.log(value.userCity);
        return new Promise(resolve =>{
            var addr = 'http://v.juhe.cn/weather/index?cityname=' + value[0].userCity + '&key=8a243fddebdd1ff372d8cd0678862674';
            http.get(global.encodeURI(addr), (res) => {
                res.on('data', (data) => {
                    console.log(data)
                    resolve([...value,data.toString('utf8')])
                });
            })
        })
    })
    .then(value =>{
            //创建服务
            // console.log(value.length)
            var l = value.length;
            var w = l-1;
            server.on('request',(req,res)=>{
                //读取图片信息
                if(req.url.split('/')[1] === 'images') {
                    var photo = req.url.split('/')[2];
                    optfile.readImg('../我的/images/'+photo, res);
                    // console.log("主程序结束");
                }
                if(req.url==='/react'){
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    // console.log(unique(value));
                    res.end(JSON.stringify(unique(value)));
                }

                if(req.url==='/pp'){
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    var obj="";
                    req.on('data',function(data){
                        obj+=data;
                        console.log('接收：'+data)
                    })
                    res.end();
                }
            })
    })

    function unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].cloSmallPic==arr[j].cloSmallPic){  
                    arr.splice(j,1);
                    j--;
                }
            }
        }
    return arr;
    }



    server.listen(8083);