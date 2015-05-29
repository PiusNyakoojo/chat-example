var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var population = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    population++;
    io.emit('update-population', population);

    socket.on('disconnect', function(){
        population--;
        io.emit('update-population', population);
    });

    socket.on('update-chat', function(data){
        io.emit('update-chat', data);
    });

});
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
//server.listen(port, ip_address, function () {
  console.log( "Listening on " + ip_address + ", server_port " + port );
//});

//var port = process.env.PORT || 3000;

http.listen(port, ip_address, function(){
    console.log( "Listening on " + ip_address + ", server_port " + port );
});