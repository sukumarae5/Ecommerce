const myqsl = require("mysql2/promise");
var sqlConnection = myqsl.createPool({
  host: "0.tcp.in.ngrok.io",
  port: 13869,
  user: "root",
  password: "123456",
  database: "ecommercedb",
});

module.exports = sqlConnection;
