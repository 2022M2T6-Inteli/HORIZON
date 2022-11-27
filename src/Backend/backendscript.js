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
app.use(express.static(".."));


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
//                  Endpoints relacionados à tabela Dados Principais                  //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readDados", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM DadosPrincipais ORDER BY departamento COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarDados', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO DadosPrincipais (cnpj, razaoSocial, nomeFantasia, departamento) VALUES ('" + req.body.cnpj + "', '" + req.body.razaoSocial + "', '" + req.body.nomeFantasia + "', '" + req.body.departamento + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>DADOS INSERIDOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaDados', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM DadosPrincipais WHERE codDadosPrincipais="+ req.query.codDadosPrincipais;
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
app.post('/atualizaDados', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE DadosPrincipais SET cnpj='" + req.body.cnpj + "', razaoSocial = '" + req.body.razaoSocial + "' , nomeFantasia='" + req.body.nomeFantasia + "' , departamento='" + req.body.departamento + "' WHERE codDadosPrincipais='" + req.body.codDadosPrincipais +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>DADOS ATUALIZADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteDados", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM DadosPrincipais WHERE codDadosPrincipais='" + req.body.codDadosPrincipais + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>DADOS DELETADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Empreiteiro                       //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readEmpreiteiro", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Empreiteiro ORDER BY nome_empreiteiro COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarEmpreiteiro', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Empreiteiro (nome_empreiteiro) VALUES ('" + req.body.nome_empreiteiro + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>EMPREITEIRO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaEmpreiteiro', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Empreiteiro WHERE cod_empreiteiro="+ req.query.cod_empreiteiro;
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
app.post('/atualizaEmpreiteiro', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Empreiteiro SET nome_empreiteiro='" + req.body.nome_empreiteiro + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>EMPREITEIRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteEmpreiteiro", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Empreiteiro WHERE cod_empreiteiro='" + req.body.cod_empreiteiro + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>EMPREITEIRO DELETADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Endereço                          //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readEndereco", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Endereco ORDER BY cidade COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarEndereco', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Endereco (cep, rua, numero, bairro, cidade) VALUES ('" + req.body.cep + "', '" + req.body.rua + "', '" + req.body.numero + "', '" + req.body.bairro + "', '" + req.body.cidade + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>ENDERECO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaEndereco', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Endereco WHERE cod_endereco="+ req.query.cod_endereco;
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
app.post('/atualizaEndereco', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Endereco SET cep='" + req.body.cep + "', rua = '" + req.body.rua + "' , numero='" + req.body.numero + "' , bairro='" + req.body.bairro + "' ,  cidade='" + req.body.cidade +  "' WHERE cod_endereco='" + req.body.cod_endereco +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>ENDERECO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteEndereco", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Endereco WHERE cod_endereco='" + req.body.cod_endereco + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>ENDERECO DELETADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Funcionário                       //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readFuncionario", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Funcionario ORDER BY cargo COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarFuncionario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Funcionario (cod_login_func, nome_func, cargo) VALUES ('" + req.body.cod_login_func + "', '" + req.body.nome_func + "', '" + req.body.cargo + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>FUNCIONARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaFuncionario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Funcionario WHERE cod_func="+ req.query.cod_func;
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
app.post('/atualizaFuncionario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Funcionario SET cod_login_func='" + req.body.cod_login_func + "', nome_func = '" + req.body.nome_func + "' ,  cargo='" + req.body.cargo +  "' WHERE cod_func='" + req.body.cod_func +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>FUNCIONARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteFuncionario", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Funcionario WHERE cod_func='" + req.body.cod_func + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>FUNCIONARIO DELETADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//             Endpoints relacionados à tabela Informações Bancárias                  //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readInfo", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM InfoBancarios ORDER BY comprovante_banc COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarInfo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO InfoBancarios (agencia, conta, comprovante_banc) VALUES ('" + req.body.agencia + "', '" + req.body.conta + "', '" + req.body.comprovante_banc + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>INFORMACOES BANCARIAS INSERIDAS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaInfo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM InfoBancarios WHERE cod_dadosbancarios="+ req.query.cod_dadosbancarios;
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
app.post('/atualizaInfo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE InfoBancarios SET agencia='" + req.body.agencia + "', conta = '" + req.body.conta + "' ,  comprovante_banc='" + req.body.comprovante_banc +  "' WHERE cod_dadosbancarios='" + req.body.cod_dadosbancarios +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>DADOS BANCARIOS ATUALIZADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteInfo", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM InfoBancarios WHERE cod_dadosbancarios='" + req.body.cod_dadosbancarios + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>DADOS BANCARIOS DELETADOS COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Login                             //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readLogin", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Login ORDER BY senha COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarLogin', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Login (cod_login_empreiteiro, cod_login_func, email, senha) VALUES ('" + req.body.cod_login_empreiteiro + "', '" + req.body.cod_login_func + "', '" + req.body.email + "', '" + req.body.senha + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>LOGIN INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaLogin', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Login WHERE cod_login="+ req.query.cod_login;
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
app.post('/atualizaLogin', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Login SET cod_login_empreiteiro='" + req.body.cod_login_empreiteiro + "', cod_login_func = '" + req.body.cod_login_func + "' , email = '" + req.body.email + "'   senha='" + req.body.senha +  "' WHERE cod_login='" + req.body.cod_login +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>LOGIN ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteLogin", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Login WHERE cod_login='" + req.body.cod_login + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>LOGIN DELETADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

/*
========================================================================================
//                  Endpoints relacionados à tabela Cadastro                          //
//                                COMPLETO                                            //
========================================================================================
*/
//READ
app.get("/readCadastro", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    var sql = 'SELECT * FROM Cadastro ORDER BY cod_dadosbancarios COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//CREATE
app.post('/registrarCadastro', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Cadastro (cod_login_empreiteiro, cod_dados_principais, cod_comunicacao_, cod_endereco, cod_dados_bancarios) VALUES ('" + req.body.cod_login_empreiteiro + "', '" + req.body.cod_dados_principais + "', '" + req.body.cod_comunicacao + "', '" + req.body.cod_endereco + "', '" + req.body.cod_dadosbancarios + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>CADASTRO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// UPDATE
app.get('/atualizaCadastro', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Cadastro WHERE cod_cadastro="+ req.query.cod_cadastro;
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
app.post('/atualizaCadastro', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Cadastro SET cod_login_empreiteiro='" + req.body.cod_login_empreiteiro + "', rua = '" + req.body.cod_dados_principais + "' , cod_comunicacao='" + req.body.cod_comunicacao + "' , cod_endereco='" + req.body.cod_endereco + "' ,  cod_dadosbancarios='" + req.body.cod_dadosbancarios +  "' WHERE cod_cadastro='" + req.body.cod_cadastro +  "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//DELETE
app.post("/deleteCadastro", urlencodedParser, (req, res) => { //Deleta uma obra do banco de dados
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM Cadastro WHERE cod_cadastro='" + req.body.cod_cadastro + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBSOURCE); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>CADASTRO DELETADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
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
    var sql = 'SELECT * FROM idObras ORDER BY descricao COLLATE NOCASE';
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
	sql = "INSERT INTO idObras (nome_obra, localizacao, tamanho, setor_requisitado, vagas_requeridas, data_inicio, data_fim, descricao) VALUES ('" + req.body.nome_obra + "', '" + req.body.localizacao + "', '" + req.body.tamanho + "', '" + req.body.setor_requisitado + "', '" + req.body.vagas_requeridas + "', '" + req.body.data_inicio + "', '" + req.body.data_fim + "', '" + req.body.descricao + "')";
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
	sql = "UPDATE idObras SET nome_obra='" + req.body.nome_obra + "', localizacao = '" + req.body.localizacao + "' , tamanho='" + req.body.tamanho + "' , setor_requisitado='" + req.body.setor_requisitado + "', vagas_requeridas= '" + req.body.vagas_requeridas + "', data_inicio= '" + req.body.data_inicio + "', data_fim= '" + req.body.data_fim + "', descricao= '" + req.body.descricao + "' WHERE cod_cadastro_obra='" + req.body.cod_cadastro_obra +  "'";
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


