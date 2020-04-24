const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require("./dbConfig.js");
const dbFunc = new db.dbFunctions();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'react-client/build')));

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname+'/react-client/build/index.html'));
});

app.get("/users/:user_id", dbFunc.hasUser);
app.get("/plans/:user_id", dbFunc.getPlans);
app.get("/activities/:plan_id", dbFunc.getActivities);

app.post("/users", dbFunc.addUser);
app.post("/plans", dbFunc.addPlan);
app.post("/activities", dbFunc.addActivity);

app.put("/plans", dbFunc.editPlan);
app.put("/activities", dbFunc.editActivity);

app.delete("/plans/:plan_id", dbFunc.deletePlan);
app.delete("/activities/:activity_id", dbFunc.deleteActivity);

var server = app.listen(process.env.PORT || 3001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});