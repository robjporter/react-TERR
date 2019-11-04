var express = require('express');
var router = express.Router();
var mysql = require("mysql");

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'sofa',
    password : 'S0fa1234',
    database : 'sofa'
});

async function getInfo(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, results){
            if (err){ 
                throw err;
            }
            resolve(results);
        });
    });
}

/* GET home page. */
router.get('/getAll', async function(req, res, next) {
    let tmp = [];

    try {
        tmp = await getInfo("SELECT * FROM status").then(results => {
            return results;
        });
    }  catch(e) {
        console.log(e);
    }

    console.log("RECORDS: ", tmp.length);
    res.json(tmp);
});

module.exports = router;
