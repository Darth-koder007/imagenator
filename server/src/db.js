import mysql from 'mysql';

export default callback => {

const pool  = mysql.createPool({
  connectionLimit : 10,
	"user": "root",
 	"password": "root",
 	"database": "imagenator",
 	"port": "3306",
 	"host": "127.0.0.1",
});

const getConnectionPool = (callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      if (err && err.fatal) {
        console.log("Attempting to re-connect to mysql");
        setTimeout(() => getConnectionPool(callback), 500);
      }

      return;
    }

		callback(connection);

    connection.on('error', (error) => {
      console.log("fatal error ->>", error);
      if (error && error.fatal) {
        console.log("Attempting to re-connect to mysql");
        setTimeout(() => getConnectionPool(callback), 500);
      }

      return;
    });
    console.log('connected as id ' + connection.threadId);
  });
};

getConnectionPool(callback);
}
