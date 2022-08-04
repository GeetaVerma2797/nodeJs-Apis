const sql = require("../../db");

module.exports = {
	createTask: async function (req, res, next) {
		try {
            const url = req.protocol + "://" + req.get("host");
            console.log(req.body);
            let title = req.body.title;
            let dueDate = req.body.due_date;
            let filePath = url + '/files/' + (req.file ? req.file.attachment : req.body.attachment);
            let userId = req.userData.userId
            console.log("filePath", filePath)

            let  insertQuery = "INSERT INTO `tasks` (title, attachment, due_date, userId) VALUES ('"+title+"','"+filePath+"','"+dueDate+"','"+userId+"')";
            console.log("query",  insertQuery)
            sql.query(insertQuery, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                return res.json({
                    status:{
                        message: "Data inserted successfully",
                        code: 201
                    },
                    data: {
                        token:req.body.authorization,
                        task:{
                            title : req.body.title,
                            dueDate : req.body.due_date,
                            filePath : filePath,
                            userId : req.userData.userId
                        }
                    }
                });
            });
        
                
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
        }
    }
}