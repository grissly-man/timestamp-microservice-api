var express = require('express');
var app = express();
var path = require('path');
var MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use('/', express.static(path.join(__dirname ,"doc")));

/**
 * @api {get} /{datetime} getTime
 * @apiDescription Converts either a UNIX or human-readable Date string into a JSON object representing both
 * @apiName getTime
 * @apiGroup TimestampMicroservice
 * @apiParam {String} datetime Either a UNIX timestamp or a human-readable date string
 * @apiExample {url} Request-Example:
 *  https://timestamp-microservice-logan.herokuapp.com/1358035200
 * @apiExample {url} Request-Example:
 *  https://timestamp-microservice-logan.herokuapp.com/January 13 2013
 * @apiSuccess {Number} unix The UNIX timestamp of the input date
 * @apiSuccess {String} natural The human readable datestring of the input date
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "unix":1358035200,"natural":"January 13 2013"
 *  }
 */
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