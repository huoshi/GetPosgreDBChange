    var fs = require('fs');
    var http = require('http');
    var socket = require('socket.io');
    var pg = require('pg');
    var util=require('util');
    
    var constr=util.format('%s://%s:%s@%s:%s/%s', 'postgres','postgres','password','IPaddress',5432,'DBName');
    var server = http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(fs.readFileSync(__dirname + '/index.html'));
    }).listen(8081, function() {
        console.log('Listening at: http://localhost:8081');
    });

    var pgClient = new pg.Client(constr);
  
    var socketio=socket.listen(server);//socketio
    socketio.on('connection', function (socketclient) {
        console.log('connect socket:');    
    });
    var sql = 'LISTEN win';
    var query = pgClient.query(sql);

    pgClient.on('notification', function (data) {
        console.log(data.payload);
        socketio.emit('winchange', data.payload);    
    });
    pgClient.connect();