const jwt = require('jsonwebtoken');
const sql = require("../../db");
var bcrypt = require("bcrypt");

module.exports = {
	insertUserDetails: async function (req, res, next) {
		try {
            
            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

console.log("emailToValidate", emailRegexp.test(req.body.email));

                if((!req.body.userName || req.body.userName == '') || (!req.body.email || req.body.email == '' || !emailRegexp.test(req.body.email))){
                    return res.json({
                        status:{
                            message: "Client side errors",
                            code: 401
                        }
                  });
                
                }
                let  fetchQuery = "SELECT * FROM `users` WHERE `email`='"+req.body.email+"'";
                    console.log("query",  fetchQuery)
                    let userExist = false;
                    let user = sql.query(fetchQuery, async function (err, result) {
                        if (err) throw err;
                        if(result.length > 0){
                            return res.json({
                                status:{
                                    message: "User already exists with this email id",
                                    code: 200
                                }
                          });
                        } else {

                            
                                let password;
                                if(req.body.password)
                                    password = bcrypt.hashSync(req.body.password, 10);
                                 let userName = req.body.userName;
                                let email = req.body.email;
                                let  insertQuery = "INSERT INTO `users` (userName, email, password) VALUES ('"+userName+"','"+email+"','"+password+"')";
                                console.log("query",  password, insertQuery)
                                sql.query(insertQuery, function (err, result) {
                                    if (err) throw err;
                                    console.log("1 record inserted");
                                    return res.json({
                                        status:{
                                            message: "Registered successfully",
                                            code: 201
                                        },
                                        data: {
                                            userName: req.body.userName,
                                            email: req.body.email,
                                            password: req.body.password
                                        }
                                    });
                          });
                        }
                    });
                    
                
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
        }
    },

    login: async function (req, res, next) {
        try {
            let  fetchQuery = "SELECT * FROM `users` WHERE `email`='"+req.body.email+"'";
                    console.log("query",  fetchQuery)
                    let userExist = false;
                    let user = sql.query(fetchQuery, function (err, result) {
                        if (err) throw err;
                        if(result.length>0){

                            result.forEach(async r => {
                                console.log(r.password)
                                   
                                    userExist = await bcrypt.compare(
                                        req.body.password,
                                        r.password
                                      );
                                      if(userExist){
                                        const token = jwt.sign(
                                            {userId:r.userId, email:req.body.email},
                                            process.env.JWT_KEY,
                                            {expiresIn: "2h"}
                                            );
                                            return res.json({
                                                status:{
                                                    message: "Logged in successfully",
                                                    code: 200
                                                },
                                                data: {
                                                    user: r,
                                                    token: token
                                                }
                                            });
                                    } else {
                                        return res.status(401).json({
                                            status:{
                                                message: "Password is incorrrect",
                                                code: 401
                                            }
                                        });
                                    }
                                });
                        } else {
                            return res.status(401).json({
                                status:{
                                    message: "User doesn't exist",
                                    code: 401
                                }
                            });
                        }    
                      });

            
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
          
        }
    }
}