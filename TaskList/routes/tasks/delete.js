const sql = require("../../db");

module.exports = {
	deleteTask: async function (req, res, next) {
		try {
           
            let userId = req.userData.userId
            let taskId = req.params.id;

            let  deleteQuery = "DELETE FROM `tasks` WHERE `taskId`='"+taskId+"' AND `userId`='"+userId+"'";
            console.log("query",  deleteQuery)
            sql.query(deleteQuery, function (err, result) {
                if (err) throw err;
                console.log("Task deleted successfully");
                if(result.affectedRows > 0){

                    return res.json({
                        status:{
                            message: "Task deleted successfully",
                            code: 205
                        }
                    });
                } else {
                    return res.json({
                        status:{
                            message: "Invalid task id for current user",
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