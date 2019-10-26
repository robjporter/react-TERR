var express = require('express');
var router = express.Router();
var mysql = require("mysql");

const connection = mysql.createConnection({
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
router.get('/:surname/:firstname', async function(req, res, next) {
    var am = [];
    var sname = req.params.surname;
    var fname = req.params.firstname;
    var name = escape(sname + ", " + fname);

    let tmp = [];

    tmp = await getInfo("SELECT am.id, am.am_name, account.id, account.account_name, account.sector_name, account.region_name from pss JOIN am on pss.id=am.pss_id JOIN account on am.id=account.am_id WHERE pss.pss_name='" + name + "' ORDER BY account.account_name;").then(results => {
        return results;
    });

    console.log("RECORDS: ", tmp.length);

    res.json(tmp);
});

module.exports = router;
