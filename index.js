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

app.get("/test", dbFunc.testApi)

var server = app.listen(process.env.PORT || 3001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});