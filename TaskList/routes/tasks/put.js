const sql = require("../../db");

module.exports = {
	updateTask: async function (req, res, next) {
		try {
            const url = req.protocol + "://" + req.get("host");
            console.log(req.body);
            let title = req.body.title;
            let dueDate = req.body.due_date;
            let filePath = url + '/files/' + (req.file ? req.file.attachment : req.body.attachment);
            let userId = req.userData.userId
            let taskId = req.params.id;
            console.log("filePath", filePath)

            let  updateQuery = "UPDATE `tasks` SET title = '"+title+"', attachment = '"+filePath+"', due_date = '"+dueDate+"', userId = '"+userId+"' WHERE `taskId`='"+taskId+"' AND `userId`='"+userId+"'";
            console.log("query",  updateQuery)
            sql.query(updateQuery, function (err, result) {
                if (err) throw err;
                console.log("task updated successfully");
                if(result.affectedRows > 0){

                    return res.status(205).json({
                        status:{
                            message: "Task updated successfully",
                            code: 205
                        }
                    });
                } else {
                    return res.status(401).json({
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