const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'react-client/')));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname+'/react-client/index.html'));
});

var server = app.listen(process.env.PORT || 3001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});