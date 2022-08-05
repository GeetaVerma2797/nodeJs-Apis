const sql = require("../../db");
module.exports = {
	deleteUserDetails: async function (req, res, next) {
        try {
            let query = "SELECT * FROM `user_details` WHERE `userId`="+req.params.id;
            sql.query(query, function (err, result) {
                if (err) throw res.json({
                    status:{
                        message: err,
                        code: 401
                    }
                });
            if(result.length > 0){

                let  deleteQuery = "DELETE FROM `user_details` WHERE `userId`="+req.params.id;
                sql.query(deleteQuery, function (err, result) {
                    if (err) throw res.json({
                        status:{
                            message: err,
                            code: 401
                        }
                    });
                    console.log("user details", result);
                    return res.json({
                        status:{
                            message: "successfully deleted",
                            code: 200
                        }
                    });
                    });
            } else {
                return res.json({
                    status:{
                        message: "user not found",
                        code: 200
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