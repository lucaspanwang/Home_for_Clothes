const mysql = require('mysql');
const http = require('http');
const optfile=require('./fs_read');
const random=require('string-random');
const fs=require('fs')
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();
let server=http.createServer();
let user='123';
server.on('request',(req,res)=>{
    // console.log(req.url);
    if(req.url==='/userid'){
        res.setHeader('Access-Control-Allow-Origin','*');
        req.on("data",function(data){
            console.log('接收：zz'+JSON.parse(data).userId);
            user=JSON.parse(data).userId;
        })
        
    }
    let promise = new Promise(resolve=>{
        con.query(`select*from clothing where cloPlace='柜子' and userId=${user}`,(err,result)=>{
            resolve(result);
            // console.log(result);
        })
    })
    .then(value=>{
            var p=[];
            for(var i=0;i<value.length;i++){
                // console.log(value[i].cloPic)
                if(req.url==='/guizi'+i){
                    optfile.readImg('../'+value[i].cloPic,res);
                }
                p=[...p,'guizi'+i];
            }
            // console.log(p);
            
            if(req.url==='/robe'){
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200,'ok',{
                    'Content-Type':'text/palin'
                })
                // console.log(JSON.stringify(p));
                res.end(JSON.stringify(p));
                
            }
            if(req.url==='/insert'){
                res.setHeader('Access-Control-Allow-Origin','*');
                var obj = '';
                req.on("data",function(data){
                    obj += data;
                    // con.query("insert into clothing(cloId,userId,cloKind,cloPlace,cloColor,cloPic,cloSmallPic)values('190','123','裙子','我家','黑色','....',',,,,,')")
                })
                req.on('end',function(){
                    // console.log('接收：'+obj);
                    // console.log('接收：'+JSON.parse(obj).picName[0].url.split(',')[1]);
                    var base64=JSON.parse(obj).picName[0].url.split(',')[1]
                    var path='../try/one.jpg';
                    var dataBuffer=new Buffer(base64,'base64');
                    fs.writeFile(path,dataBuffer,function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('写入成功');
                        }
                    })
                    // console.log(random(4, {letters: false}));
                })
            }
        })
})

 server.listen(8087);   












