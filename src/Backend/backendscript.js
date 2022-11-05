const express = require('express'); // framework express
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sqlite3 = require('sqlite3').verbose();
const DBPATH = "Teste1.db"
const DBSOURCE = "Teste1.db"

const hostname = '127.0.0.1';// endereço
const port = 3001;// porta do site
const app = express();// app faz o manuseio do express

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
app.use(express.json());

//get, post, put, delete methods
/*
========================================================================================
//                  Endpoints relacionados à tabela Comunicacao                       //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readComunicacao", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Comunicacao ORDER BY fax COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarComunicacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Comunicacao (telefone, celular, email, fax) VALUES ('" + req.body.telefone + "', '" + req.body.celular + "', '" + req.body.email + "', '" + req.body.fax + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>MEIOS DE COMUNICACAO INSERIDOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaComunicacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Comunicacao WHERE cod_comunicacao="+ req.query.cod_comunicacao;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// UPDATE
app.post('/atualizaComunicacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Comunicacao SET telefone='" + req.body.telefone + "', celular = '" + req.body.celular + "' , email='" + req.body.email + "' , fax='" + req.body.fax + "' WHERE cod_comunicacao='" + req.body.cod_comunicacao +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>MEIOS DE COMUNICACAO ATUALIZADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteComunicacao", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Comunicacao WHERE cod_comunicacao='" + req.body.cod_comunicacao + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>MEIOS DE COMUNICACAO DELETADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Obras                             //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readidObras", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM idObras ORDER BY data_fim COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarObras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO idObras (nome_obra, localizacao, tamanho, setor_requisitado, vagas_requeridas, data_inicio, data_fim) VALUES ('" + req.body.nome_obra + "', '" + req.body.localizacao + "', '" + req.body.tamanho + "', '" + req.body.setor_requisitado + "', '" + req.body.vagas_requeridas + "', '" + req.body.data_inicio + "', '" + req.body.data_fim + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>OBRA INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaObras', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM idObras WHERE cod_cadastro_obra="+ req.query.cod_cadastro_obra;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// UPDATE
app.post('/atualizaObras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE idObras SET nome_obra='" + req.body.nome_obra + "', localizacao = '" + req.body.localizacao + "' , tamanho='" + req.body.tamanho + "' , setor_requisitado='" + req.body.setor_requisitado + "', vagas_requeridas= '" + req.body.vagas_requeridas + "', data_inicio= '" + req.body.data_inicio + "', data_fim= '" + req.body.data_fim + "' WHERE cod_cadastro_obra='" + req.body.cod_cadastro_obra +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>OBRA ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.get("/deleteObras", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM idObras WHERE cod_cadastro_obra='" + req.query.cod_cadastro_obra + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>OBRA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

// INNER JOIN
app.get('/loginEmpreiteiro', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(req.body)
	var sql = `SELECT Empreiteiro.nome_empreiteiro, Login.email, Login.senha, Login.cod_login FROM Login INNER JOIN Empreiteiro ON Login.cod_login = Empreiteiro.cod_empreiteiro`;
	console.log(sql);
	db.all(sql, [],  (err, rows ) => {
	   if (err) {
		   throw err;
	   }
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });


