const net = require('net');
const port = 20000;

let server = net.createServer((socket) => {

	socket.id = Math.floor(Math.random() * 1000);
	//console.log(util.inspect(socket));
	
	console.log('Socket connected as ' + socket.id);
	socket.write('connected as ' + socket.id);

	socket.on('data',(data)=>{
		console.log('got data: ' + data);
		socket.write('echo ' + data + '\n');
	});

	socket.on('error',(err)=>{
		console.log(socket + 'err ' + err);
	});

	socket.on('close',()=>{
		console.log(socket.id + ' disconnected.');
	});
});

server.listen(port);
console.log('TCP listening at port ' + port);