const express = require('express');
const mysql = require('mysql');
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
  var sql = "CREATE TABLE tle_data (line1 VARCHAR(255), line2 VARCHAR(255),line3 VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle')
  .then(res => res.text())
  .then(data => {
    const lines = data.split('\n');
    
    const canvas = document.querySelector('.title');

    lines.forEach(line => {
      const markup = `<li>${line}</li>`;
      canvas.insertAdjacentHTML('beforeend', markup);
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO tle_data VALUES ('"+lines[0]+"','"+lines[1]+"','"+lines[2]+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        con.end(); 
      });
    });
  })
  .catch(error => {
    console.error('Error fetching TLE data:', error);
  });