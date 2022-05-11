const db = require('mysql2')

const Database = db.createPool({
    host:'127.0.0.1',
    database:'student',
    user:'root',
    password:'sudjing',
    port:3307,
	//timezone:'z'
})
module.exports = Database.promise();

//const Database = db.createPool({
//    host:'127.0.0.1',
//    database:'activity',
//    user:'activity',
//    password:'tanasat1',
//    port:3306,
//	//timezone:'z'
//})
//module.exports = Database.promise();