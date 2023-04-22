var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sailu@3002",
    database: "mydb"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected");
 
//   var sql="CREATE table Student(name varchar(50),city varchar(50))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table Created!");
//   });
// });


// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Database Connected");
//     var sql = "INSERT INTO Student VALUES ('Saaho','Wazi')";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM Student", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

con.connect(function(err) {
  if (err) throw err;
  con.query("Delete from Student where name='Saaho'", function (err, result, fields) {
      if (err) throw err;
      console.log("Data Updated");
  });
});

con.connect(function(err) {
  if (err) throw err;
  con.query("Update Student set name='Nikhila' where name='Nikhilesh'", function (err, result, fields) {
      if (err) throw err;
      console.log("Data Updated");
  });
});
