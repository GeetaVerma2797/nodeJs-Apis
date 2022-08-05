var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Geeta@123",
    database: "details"

});

con.connect(function(err){
    if(err) throw err;
    console.log("connected");
})

module.exports = con;

/*
CREATE DATABASE `details`;
USE `details`;
    CREATE TABLE `user_details` (
        `userId` int NOT NULL,
        `userName` varchar(100),
        `contactNum` int, 
        `password` varchar(100), 
        `createDateTime` datetime, 
        UNIQUE (`userId`), 
        PRIMARY KEY (`userId`), 
        CHECK (LENGTH(`contactNum`)=10)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Geeta@123';


Task 4:

SELECT a.cust_name AS `Customer Name`, 
a.city, b.name AS `Salesman`, b.commission 
FROM customer a 
INNER JOIN salesman b 
ON a.salesman_id=b.salesman_id 
WHERE b.commission>0.12;

*/
