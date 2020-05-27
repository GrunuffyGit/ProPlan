const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require("./dbConfig.js");
const dbFunc = new db.dbFunctions();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'react-client/build')));

app.get("/users/:user_id", dbFunc.hasUser);
app.get("/plans/:user_id", dbFunc.getPlans);
app.get("/plan/:plan_id", dbFunc.getPlan);
app.get("/activities/:plan_id", dbFunc.getActivities);

app.post("/hasPlan", dbFunc.planBelongToUser);
app.post("/users", dbFunc.addUser);
app.post("/plan", dbFunc.addPlan);
app.post("/activities", dbFunc.addActivity);

app.put("/plan", dbFunc.editPlan);
app.put("/activities", dbFunc.editActivity);

app.delete("/users/:user_id", dbFunc.deleteUser);
app.delete("/plan/:plan_id", dbFunc.deletePlan);
app.delete("/activities/:activity_id", dbFunc.deleteActivity);

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname+'/react-client/build/index.html'));
});

var server = app.listen(process.env.PORT || 3001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});

module.exports = server;