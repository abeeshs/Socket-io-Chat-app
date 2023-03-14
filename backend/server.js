const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

//creating a instance of server class
const io = new Server(server, {
	//setting cors origin policy
	cors: {
		origin: 'http://localhost:3000',
		methods: ['POST', 'GET']
	}
});

//Creating connection
io.on('connection', (socket) => {
	console.log(`User connected:${socket.id}`);

//Join to the room with room number
	socket.on('join_room', (data) => {
		socket.join(data);
		
	});
	
	socket.on('send_message',(data)=>{
		socket.to(data.room).emit('received_message',data)
	})

	socket.on('disconnected', () => {
		console.log('User disconnected' + socket.id);
	});
});

server.listen(3001, () => console.log('Server running'));
