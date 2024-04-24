const myqsl = require("mysql2/promise");
var sqlConnection = myqsl.createPool({
  host: "0.tcp.in.ngrok.io",
  port: 16911,
  user: "root",
  password: "123456",
  database: "ecommercedb",
  reconnect:true
});

module.exports = sqlConnection;

