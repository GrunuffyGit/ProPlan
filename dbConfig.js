const Pool = require('pg').Pool;
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://localhost:5432/booktonica`
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})
class dbFunctions{
    testApi = function(req, res){
        pool.query("SELECT * FROM users;", (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        })
    }
}

module.exports = {dbFunctions};