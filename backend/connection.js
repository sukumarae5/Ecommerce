const myqsl = require("mysql2/promise");
var sqlConnection = myqsl.createPool({
  host: "localhost",
  // port: 19347,
  user: "root",
  password: "123456",
  database: "ecommercedb",
});

module.exports = sqlConnection;

