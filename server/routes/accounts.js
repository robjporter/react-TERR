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

router.post('/getMotions', async function(req, res, next) {
    var ids = req.body;
    let id = ids.join(", ");
    let tmp = [];

    try {
        tmp = await getInfo("SELECT account.id as ac_id, account.account_name, status.id, status.status_name, status.status_score, salesmotion.id as salesmotiion_id, salesmotion.salesmotion_name from account JOIN accountmotion on accountmotion.account_id=account.id JOIN salesmotion on accountmotion.salesmotion_id=salesmotion.id JOIN status on accountmotion.status_id=status.id WHERE account.id in ( " + id + " );").then(results => {
            return results;
        });
    }  catch(e) {
        console.log(e);
    }

    console.log("RECORDS: ", tmp.length);
    res.json(tmp);
});

router.get('/getAccount/:id', async function(req, res, next) {
    var id = req.params.id;
    let tmp = [];

    try {
        tmp = await getInfo("SELECT salesmotion.id, salesmotion.salesmotion_name, status.status_name from salesmotion JOIN accountmotion on accountmotion.salesmotion_id=salesmotion.id JOIN status on accountmotion.status_id=status.id WHERE accountmotion.account_id=" + id + ";").then(results => {
            return results;
        });
    }  catch(e) {
        console.log(e);
    }
    console.log("RECORDS: ", tmp.length);
    res.json(tmp);
});

module.exports = router;

/*
SELECT account.id, account.account_name, status.id, status.status_name, status.status_score, salesmotion.salesmotion_name from account JOIN accountmotion on accountmotion.account_id=account.id JOIN salesmotion on accountmotion.salesmotion_id=salesmotion.id JOIN status on accountmotion.status_id=status.id WHERE account.id in (1,2,3,17);
*/