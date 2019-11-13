var express = require('express');
var fs = require("fs");
var router = express.Router();

router.get('/getUsers', function (req, res) {
    fs.readFile( 'users.json', 'utf8', function (err, data) {
        console.log( "data", data );
        res.end( data );
     });
 });

 router.post('/addUser', function (req, res) {
    fs.readFile( 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        let newId = req.body.id;
        data["user" + newId] = req.body;
        fs.writeFile('users.json', JSON.stringify(data), function(err){
            if (err) return console.log(err);
         })
        res.end( JSON.stringify(data));
     });
 });


module.exports = router;