const bcrypt = require('../../middleware/encDecr');
const sql = require("../../db");

module.exports = {
	getUserDetails: async function (req, res, next) {
		try {
            
            let  fetchQuery = "SELECT * FROM `user_details` ORDER BY `createDateTime` ASC ";
                    console.log("query",  fetchQuery)
                    let fetchData = {};
                    sql.query(fetchQuery, function (err, result) {
                        if (err) throw err;
                        console.log("user details", result);
                        result.forEach(async r => {
                            try {
                                r['password'] = await bcrypt.decrypt(JSON.parse(r['password']));
                            } catch (error) {
                                return res.status(404).json({ status: { message: "error occured: " + error.message, code: 404 }, data: error.stack });
                            }
                            console.log("passss", r)

                          });

                          Object.assign(fetchData, result);
                          console.log("pass", fetchData)

                          return res.json({
                          status:{
                              message: "successfull",
                              code: 200
                          },
                          data: fetchData
                      });

                      });

                
                     
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "error occured: " + error.message, code: 404 }, data: error.stack });
        
        }
    }
}