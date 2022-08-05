const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database

});

con.connect(function(err){
    if(err) throw err;
    console.log("connected");
})

module.exports = con;

/*
CREATE DATABASE `user_tasks`;
USE `user_tasks`;

CREATE TABLE `users` (
        `userId` int NOT NULL AUTO_INCREMENT,
        `userName` varchar(100),
        `email` varchar(100), 
        `password` davarchar(100),
        `userId` int NOT NULL,
        `createDateTime` datetime, 
        UNIQUE (`userId`), 
        PRIMARY KEY (`userId`), 
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `tasks` (
        `taskId` int NOT NULL AUTO_INCREMENT,
        `title` varchar(100),
        `attachment` varchar(100), 
        `due_date` date,
        `userId` int NOT NULL,
        `createDateTime` datetime, 
        UNIQUE (`taskId`), 
        PRIMARY KEY (`taskId`), 
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Geeta@123';



*/
