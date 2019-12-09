const mysql = require('mysql');
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();
con.query('select *from users',function(err,result,fields){
    if(err){
        console.error(err.message);
        process.exit(1);
    }
    console.log(result);
})
con.end();
