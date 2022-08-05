
module.exports = {
	getTasks: async function (req, res, next) {
		try {
            
            let userId = req.userData.userId

            let  fetchQuery = "SELECT * FROM `tasks` WHERE `userId`='"+userId+"'";
            sql.query(fetchQuery, function (err, result) {
                if (err) throw err;
                console.log("rows fetched");
                return res.status(200).json({
                    status:{
                        message: "successfull",
                        code: 200
                    },
                    data: result
                });
            });
        
                
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
        }
    }
}