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
let promise = new Promise(resolve=>{
    con.query(`select*from clothing where cloPlace='柜子' and userId='111'`,(err,result)=>{
        resolve(result);
        console.log(result);
    })
})
.then(value=>{
    http.createServer((req,res)=>{
        var p=[];
        for(var i=0;i<value.length;i++){
            console.log(value[i].cloPic)
            if(req.url==='/guizi'+i){
                optfile.readImg('../'+value[i].cloPic,res);
            }
            p=[...p,'guizi'+i];
        }
        console.log(p);
        
        if(req.url==='/robe'){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200,'ok',{
                'Content-Type':'text/palin'
            })
            console.log(JSON.stringify(p));
            res.end(JSON.stringify(p));
            
        }
    }).listen(8087)
    
})












