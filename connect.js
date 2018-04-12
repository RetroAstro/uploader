
let mysql = require('mysql');

function insert(name, path) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'alien',
        password: 'SH123456',
        database: 'sqltest'
    })

    connection.connect();

    var date = Math.round(new Date().getTime()/1000).toString();

    var sql = 'INSERT INTO photo_info(id, name, path, upload_date) VALUES(0,?,?,?)';

    var params = [name, path, date];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.log('insert error', err.message);
            return;
        } else {
            console.log('insert: ', result);
        }
    })

    connection.end();

}

module.exports = insert;


