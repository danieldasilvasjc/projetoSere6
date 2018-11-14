// C:\projetoSere6\server.js

var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost/projetosere');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + 
              app.get('port'));
});