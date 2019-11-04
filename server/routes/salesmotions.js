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

router.post('/:aid/:smid/:sid', async function(req, res, next) {
    console.log("ACCOUNT ID: ", req.params.aid);
    console.log("SALESMOTION ID: ", req.params.smid);
    console.log("STATUS ID: ", req.params.sid);
    let tmp = [];

    try {
        tmp = await getInfo("UPDATE `sofa`.`accountmotion` SET `status_id` = '" + req.params.sid + "' WHERE `salesmotion_id` = '" + req.params.smid + "' AND `account_id` = " + req.params.aid + ";").then(results => {
            return results;
        });
    }  catch(e) {
        console.log(e);
    }

    console.log("RECORDS: ", tmp.length);
    res.json(tmp);
});

module.exports = router;
