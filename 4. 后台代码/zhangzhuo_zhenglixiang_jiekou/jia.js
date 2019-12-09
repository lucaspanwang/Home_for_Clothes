const mysql = require('mysql');
const http = require('http');
const optfile=require('./fs_read');
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();
let server=http.createServer()
let promise = new Promise(resolve=>{
    con.query(`select*from clothing where cloPlace='家' and userId='111'`,(err,result)=>{
        resolve(result);
        // console.log(result);
    })
})
.then(value=>{
    server.on('request',(req,res)=>{
        var p=[];
        for(var i=0;i<value.length;i++){
            console.log(value[i].cloPic)
            if(req.url==='/jia'+i){
                optfile.readImg('../'+value[i].cloPic,res);
            }
            p=[...p,'jia'+i];
        }
        // console.log(p);
        
        if(req.url==='/home'){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200,'ok',{
                'Content-Type':'text/palin'
            })
            // console.log(JSON.stringify(p));
            res.end(JSON.stringify(p));           
        }
        if(req.url==='/insert'){
            res.setHeader('Access-Control-Allow-Origin','*');
            req.on("data",function(data){
                console.log('接收：'+data);
            })
        }
    })

    })
       
    server.listen(8084);












