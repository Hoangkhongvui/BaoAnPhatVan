var config =require("config");
var mysql=require("mysql");

var connection = mysql.createConnection({
  host     : config.get("mysql.host"),
  user     : config.get("mysql.user"),
  password : config.get("mysql.password"),
  database : config.get("mysql.database"),
  port : config.get("mysql.port"),
});
connection.connect();
function getConnection(){
    console.log("get");
    if(!connection){
        connection.connect();
    }
    // console.log(connection);
    return connection;
}
module.exports={
    getConnection:getConnection
}