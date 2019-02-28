const mysql=require('mysql');

const config= mysql.createPool({
    connectionLimit:100,
    host:'192.168.231.13',
    user:'root',
    password:'password',
    database:'hospitalfinder',
    port:3306,
    debug:false,
    multipleStatements:true,
})

module.exports=config;
