const Pool = require('pg').Pool;
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://localhost:5432/proplan`
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})
class dbFunctions{
    addUser = function(req, res){
        const {user_id, name, email} = req.body;
        pool.query("INSERT INTO users (user_id, name, email) VALUES ($1, $2, $3);", [user_id, name, email],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    addPlan = function(req,res){
        const {created_by, name, description, image_url, start_date, end_date} = req.body; 
        pool.query("INSERT INTO plans (created_by, name, description, image_url, start_date, end_date) VAULES ($1, $2, $3, $4, $5, $6);",
        [created_by, name, description, image_url, start_date, end_date], 
        (error, result) =>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    addActivity = function(req, res){
        const {plan_id, name, location, coordinates, time_start, time_end, notes} = req.body;
        pool.query("INSERT INTO activities (plan_id, name, location, coordinates, time_start, time_end, notes) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [plan_id, name, location, coordinates, time_start, time_end, notes], 
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    getPlans = function(req,res){
        const user_id = req.params.user_id;
        pool.query("SELECT * FROM plans WHERE created_by = $1;",
        [user_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    getActivities = function(req,res){
        const plan_id = req.params.plan_id;
        pool.query("SELECT * FROM activities WHERE plan_id = $1;",
        [plan_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    editPlan = function(req,res){
        const {plan_id, update_field, value} = req.body;
        pool.query("UPDATE plans SET $1 = $2 WHERE id = $3;",
        [update_field, value, plan_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    editActivity = function(req, res){
        const {activity_id, update_field, value} = req.body;
        pool.query("UPDATE activities SET $1 = $2 WHERE id = $3;",
        [update_field, value, activity_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    deletePlan = function(req, res) {
        const plan_id = req.params.plan_id;
        pool.query("DELETE FROM plans WHERE id = $1", [plan_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).send("Deleted Plan");
            }
        });
    }
    
    deleteActivity = function(req,res){
        const activity_id = req.params.activity_id;
        pool.query("DELETE FROM activities WHERE id = $1", [activity_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).send("Deleted Activity");
            }
        });
    }
}

module.exports = {dbFunctions};