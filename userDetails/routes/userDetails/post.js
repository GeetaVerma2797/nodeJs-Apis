const jwt = require('jsonwebtoken');
const sql = require("../../db");
const bcrypt = require('../../middleware/encDecr');

// constructor
const Details = function(   ) {
  this.userName = details.userName;
  this.contactNum = details.contactNum;
  this.password = details.password;
  this.createAt = details.createDateTime;
  this.token = details.token;

};

module.exports = {
	insertUserDetails: async function (req, res, next) {
		try {
            

                if((!req.body.userName || req.body.userName == '') || (!req.body.contactNum || req.body.contactNum == '' || (req.body.contactNum).length != 10)){
                    return res.json({
                        status:{
                            message: "Client errors",
                            code: 401
                        }
                  });
                
                }
                let  fetchQuery = "SELECT * FROM `user_details` WHERE `userName`='"+req.body.userName+"'";
                    console.log("query",  fetchQuery)
                    let userExist = false;
                    let user = sql.query(fetchQuery, async function (err, result) {
                        if (err) throw err;
                        // console.log("user details", result);
                        // console.log("de", de);
                        if(result.length > 0){
                            return res.json({
                                status:{
                                    message: "User already exists",
                                    code: 200
                                }
                          });
                        } else {

                            const token = jwt.sign(
                                {userName:req.body.userName, contactNum:req.body.contactNum},
                                process.env.JWT_KEY,
                                {expiresIn: "1h"}
                                );
                                let password;
                                if(req.body.password)
                                    password = await bcrypt.encrypt(req.body.password);
                                
                                console.log("pass",password)
            
                                let userName = req.body.userName;
                                let contactNum = req.body.contactNum;
                                let  insertQuery = "INSERT INTO `user_details` (userName, contactNum, password, token) VALUES ('"+userName+"','"+contactNum+"','"+JSON.stringify(password)+"','"+token+"')";
                                console.log("query",  insertQuery)
                                sql.query(insertQuery, function (err, result) {
                                    if (err) throw err;
                                    console.log("1 record inserted");
                                    return res.json({
                                        status:{
                                            message: "Data inserted successfully",
                                            code: 200
                                        },
                                        data: {
                                            token:token,
                                            expiresIn: 3600,
                                        }
                                    });
                            // return result;
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
            let password =await bcrypt.encrypt(req.body.password);
            console.log("pass", password);
            // +"' AND `password`='"+password.encryptedData+"'"
            let  fetchQuery = "SELECT * FROM `user_details` WHERE `userName`='"+req.body.userName+"'";
                    console.log("query",  fetchQuery)
                    let userExist = false;
                    let user = sql.query(fetchQuery, function (err, result) {
                        if (err) throw err;
                        // console.log("user details", result);
                        // console.log("de", de);
                        result.forEach(async r => {
                            console.log(r.password)
                                let decrypt = await bcrypt.decrypt(JSON.parse(r.password));
                                console.log("Decrypt", decrypt);
                                if(req.body.password == decrypt){
                                    userExist = true;
                                }
                            });
                        return result;
                      });

            if(userExist){
                console.log(req.body.password, user.password);
                    const token = jwt.sign(
                        {userName:req.body.userName, contactNum:req.body.contactNum},
                        process.env.JWT_KEY,
                        {expiresIn: "1h"}
                        );
                    return res.json({
                        status:{
                            message: "Login successfully",
                            code: 200
                        },
                        data: {
                            token:token,
                            expiresIn: 3600,
                            userId: user._id
                        }
                    });
            } else {
                return res.status(401).json({
                    status:{
                        message: "User don't exist",
                        code: 401
                    }
                });
            }
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
          
        }
    }
}