var express = require('express');
var app = express();
var path = require('path');
var MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use('/', express.static(path.join(__dirname ,"out", "timestamp-microservice-api", "1.0.0")));

app.use('/:datetime', function(req, res) {
    var date = new Date(req.params.datetime);
    
    if (date == "Invalid Date") {
        date = new Date(req.params.datetime * 1000);
        if (date.getTime() / 1000 != req.params.datetime) {
            return res.end(date.getTime().toString());
        }
    }
    
    var unix = date.getTime() / 1000;
    var natural = MMMM[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
    
    return res.json({
        unix: unix,
        natural: natural
    });
});
app.listen(process.env.PORT || 8080);