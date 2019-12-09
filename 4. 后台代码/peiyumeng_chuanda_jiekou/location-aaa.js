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
var obj='';
server.on('request',(req,res)=>{
    if(req.url==='/aa'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        req.on('data',function(data){
            console.log('接收：'+data)
            user=JSON.parse(data).userId
        })
        res.end();
    }
    // console.log(user)
    //获取天气预报
    let promise = new Promise(resolve =>{
        //查询数据库数据获得用户信息
        con.query(`select * from users,clothing where clothing.userId = users.userId and clothing.userId=${user}`, (err, result) => {
            resolve(result)
        })
    })
        .then(value =>{
            return new Promise(resolve =>{
                var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+value[0].userCity+'&appid=24444633&appsecret=cgkFXVq9'
                //var addr = 'http://apis.juhe.cn/simpleWeather/query?city=' + value[0].userCity + '&key=920c1777ec74c79b8fcb7406a793b559';
                http.get(global.encodeURI(addr), (res) => {
                    var obj = '';
                    res.on('data', (data) => {
                        obj+=data.toString('utf8');
                    });
                    console.log(obj.result);
                    var vv = obj.result
                    res.on('end',()=>{
                        resolve([...value,obj])
                    })
                })
            })
        })
        .then(value =>{
                //创建服务
                var l = value.length;
                var w = l-1;
                // server.on('request',(req,res)=>{
                    //读取图片信息
                    if(req.url.split('/')[1] === 'images') {
                        var photo = req.url.split('/')[2];
                        optfile.readImg('../我的/images/'+photo, res);
                        console.log("主程序结束");
                    }
                    // 发送信息
                    if(req.url==='/react'){
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.end(JSON.stringify(unique(value)));
                    }
                    if(req.url==='/pp'){
                        req.on('data',function(data){
                            console.log('接收：'+data)
                            obj=data;
                        })
                    }
                    if(req.url==='/pp2'){
                        console.log('????'+obj)
                        res.setHeader("Access-Control-Allow-Credentials",true)
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.end(obj);
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