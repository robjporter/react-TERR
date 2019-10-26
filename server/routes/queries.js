var express = require('express');
var router = express.Router();
var mysql = require("mysql");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sofa',
    password : 'S0fa1234',
    database : 'sofa'
});

/* GET home page. */
router.post('/run', function(req, res, next) {
    try {
        let queries = req.body;
        console.log(queries);

        const fs = require('fs');

        fs.writeFile("./output", queries, function(err) {
        
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 


        connection.connect();
        for(let i = 0; i < queries.length; i++) {
            try {
                connection.query(queries[i]);
                console.log("QUERY: ", queries[i]);
            } catch(e) {
                console.log("ERROR: ",e);
            }
        }

        connection.end();
        res.render('index', { title: 'Express' });
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;
