const myqsl = require('mysql2/promise')
var sqlConnection = myqsl.createPool({
    host:"sql6.freesqldatabase.com",
    user:"sql6694390",
    password:"2LpIc2ftDF",
    database:"sql6694390"
})


module.exports = sqlConnection;