const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const config = require('../config/config.json');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// Conect to SQL using Config
var conSql = mysql.createConnection({
    host: config.Mysql.host,
    port: config.Mysql.port,
    user: config.Mysql.user,
    password: config.Mysql.password,
    database: config.Mysql.database
});

exports.sqlConfig = function () {
    conSql.connect(function (err) {
        if (err) {
            console.log(err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                sqlConfig();
            }
        } else {
            setInterval(function () {
                conSql.query("select * from ranking where feeling='angry'");
            }, 2000);
        }
    });
    return conSql;
}

exports.getRanking = function (request, response) {
    let sql = "select * from ranking";

    conSql.query(sql, function (err, result) {
        if (err || result.length == 0) {
            response.status(400).send({
                error: "Não foi possivel encontrar resultados no banco de dados"
            });
        } else {
            response.status(200).send(result);
        }
    });
}

exports.changeRanking = function (request, response) {
    console.log(request.body);

    switch (request.body.action) {
        case "change":
            var sql = "update ranking set feeling=?,percentage=?,user=?,text=? where id=" + request.body.id;
            var values = [request.body.feeling, request.body.percentage, request.body.user, request.body.text];

            conSql.query(sql, values, function (err, result) {
                if (err) response.status(400).send({
                    error: err
                });
                else response.status(200).send({
                    status: 'Ranking alterado com sucesso, item modificado'
                });
            });
        break;
        case "new":
            var sql = "insert into ranking(feeling,percentage,user,text) values ?";
            var values = [[request.body.feeling, request.body.percentage, request.body.user, request.body.text]];

            conSql.query(sql, [values], function (err, result) {
                if (err) response.status(400).send({
                    error: err
                });
                else response.status(200).send({
                    status: 'Ranking alterado com sucesso, item adicionado'
                });
            });
        break;
    }
}