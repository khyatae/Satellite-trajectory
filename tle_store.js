import express from 'express';
import mysql from 'mysql2';
import fetch from 'node-fetch';

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "khya",
  database: "satellite_tle"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "create TABLE IF NOT EXISTS tle_data (line1 varchar(1000), line2 VARCHAR(1000), line3 VARCHAR(1000))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle')
  .then(res => res.text())
  .then(data => {
    const lines = data.split('\n');
    
        con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      for (let i = 0; i < lines.length-3; i+=3) {
      console.log(lines[i])
      console.log(lines[i+1])
      console.log(lines[i+2])
      var sql = "INSERT INTO tle_data VALUES (?,?,?)";
      con.query(sql,[lines[i],lines[i+1],lines[i+2]], function (err, result) {
        if (err) throw err;
        console.log(i+"  record inserted");
         
      });
      }
      con.end(); 
    });
  
      
  })
  .catch(error => {
    console.error('Error fetching TLE data:', error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

