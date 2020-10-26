var http = require('http'),
    io = require('socket.io');

// Create server & socket
var server = http.createServer(function(req, res){

    // Send HTML headers and message
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Aw, snap! 404</h1>');
});
server.listen(20000);
io = io.listen(server);

// Add a connect listener
io.sockets.on('connection', socket => {

    console.log('Client connected.');

    socket.on('MonitoringApp', message => {
        console.log(message); 
        if(message === 'reception,response,state,wait\n'){
            socket.emit("ReceptionApp", 'mornitoring,request,state,check\n');
        }else{
            socket.emit("ReceptionApp", 'return message:' + message);
        }
    });

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});