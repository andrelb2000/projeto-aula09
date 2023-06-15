const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/banco.db';

/* Servidor aplicação */
const hostname = '127.0.0.1';
const port = 3071;
const app = express();
app.use(express.json());
app.use(express.static("./frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/coletores', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	console.log("EndPoint /coletores");
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM TblColetor';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
/* Servidor aplicação */
app.listen(port, hostname, () => {
  console.log("Endpoints:");
  console.log(`Page server running at http://${hostname}:${port}/coletores`);
});