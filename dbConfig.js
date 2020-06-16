const Pool = require('pg').Pool;
const isProduction = process.env.NODE_ENV === "production";
const localDB = `postgres://localhost:5432/proplan`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : localDB
})
class dbFunctions{
    addUser = function(req, res){
        const {user_id, name, email} = req.body;
        pool.query("INSERT INTO users (user_id, name, email) VALUES ($1, $2, $3) RETURNING *;", [user_id, name, email],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    addPlan = function(req,res){
        let {created_by, name, description, image_url, start_date, end_date} = req.body;
        // console.log("add plan start",start_date);
        if(description === null){
            description = "No Description";
        }
        if(image_url === null){
            image_url = "https://image.flaticon.com/icons/svg/614/614685.svg";
        }
        pool.query("INSERT INTO plans (created_by, name, description, image_url, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
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
        let {plan_id, name, location, coordinates, time_start, time_end, notes} = req.body;
        time_start = new Date (time_start);
        time_end = new Date (time_end);
        // console.log(time_end);
        // console.log(time_start);
        pool.query("INSERT INTO activities (plan_id, name, location, coordinates, time_start, time_end, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
        [plan_id, name, location, coordinates, time_start, time_end, notes], 
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    hasUser = function(req, res) {
        const user_id = req.params.user_id;
        pool.query("SELECT EXISTS(SELECT * FROM users WHERE user_id = $1);",
        [user_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    planBelongToUser = function(req, res) {
        const {user_id, plan_id} = req.body;
        pool.query("SELECT EXISTS(SELECT * FROM plans WHERE created_by = $1 AND id = $2);",
        [user_id, plan_id],
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

    getPlan = function(req,res){
        const plan_id = req.params.plan_id;
        pool.query("SELECT * FROM plans WHERE id = $1;",
        [plan_id],
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
        let {plan_id, name, description, image_url, start_date, end_date} = req.body; 
        start_date = new Date (start_date);
        end_date = new Date (end_date);
        if(description === null){
            description = "No Description";
        }
        if(image_url === null){
            image_url = "https://data.whicdn.com/images/59987907/original.png";
        }
        pool.query(`UPDATE plans SET name = $1, description = $2, image_url = $3, start_date = $4, end_date = $5 WHERE id = $6 RETURNING *;`,
        [name, description, image_url, start_date, end_date, plan_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    editActivity = function(req, res){
        // console.log("req",req.body);
        let {activity_id, name, location, coordinates, time_start, time_end, notes} = req.body;
        time_start = new Date (time_start);
        time_end = new Date (time_end);
        // console.log(time_start);
        // console.log(time_end);
        pool.query(`UPDATE activities SET name = $1, location = $2, coordinates = $3, time_start = $4, time_end = $5, notes = $6 WHERE id = $7 RETURNING *;`,
        [name, location, coordinates, time_start, time_end, notes, activity_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).json(result.rows);
            }
        });
    }

    deleteUser = function(req, res) {
        const user_id = req.params.user_id;
        pool.query("DELETE FROM users WHERE id = $1", [user_id],
        (error,result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).send("Deleted User");
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