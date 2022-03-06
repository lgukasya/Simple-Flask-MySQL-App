'use strict'

// Express
const express = require('express');
const app = express();

// MySQL Library
const mysql = require('mysql2');

// Settings
const PORT = process.env.PORT || 3000;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'alumne',
  password : 'mysqlalumne',
  database : 'municipis'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.get('/ping', function(req, res, next){
  res.send({ message: 'pong' }).end();
});

app.get('/app', async function(req, res, next){
  
  var query = `SELECT comunitat FROM comunitats`;
  
  await connection.execute(query, 
    function(error, results, fields){
      if(error) throw error;
      res.json(results).end();
    });
});

app.get('/app/:c', async function(req, res, next){
  
  const comunitat = req.params.c;
  
  var query = `
   SELECT provincia FROM provincies AS p WHERE p.id_com IN
   (SELECT id_com FROM comunitats AS c WHERE c.comunitat = '${comunitat}')
  `;
  
  await connection.execute(query, 
    function(error, results, fields){
      if(error) throw error;
      res.json(results).end();
    });
});

app.get('/app/:c/:p', async function(req, res, next){
  
  const comunitat = req.params.c;
  const provincia = req.params.p;
  
  var query = `
    SELECT municipi from municipis AS m WHERE m.id_prov
    IN (SELECT p.id_prov FROM provincies AS p WHERE p.provincia = '${provincia}')
  `;
  
  await connection.execute(query, 
    function(error, results, fields){
      if(error) throw error;
      res.json(results).end();
    });
});

// Server Initialitazion
app.listen(PORT, () => {
  console.log(`Running on port ==> ${PORT}`);
});

