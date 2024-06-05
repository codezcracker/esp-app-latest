const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4001;

app.prepare().then(() => {
	const server = express();
	const httpServer = createServer(server);
	const io = new Server(httpServer, { cors: { origin: '*' } });
	
	let buttonState = false;
	
	io.on('connection', (socket) => {
		console.log('New Connection');
		
		io.to(socket.id).emit('buttonState', buttonState);
		
		socket.on('disconnect', () => {
			console.log('Disconnected');
		});
		
		socket.on('buttonState', (value) => {
			console.log('buttonState:', value);
			buttonState = value;
			socket.broadcast.emit('buttonState', value);
		});
	});
	
	server.all('*', (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});
	
	httpServer.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server running on http://localhost:${PORT}`);
	});
});
