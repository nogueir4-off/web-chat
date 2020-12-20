const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors()) //new
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
	res.render('chat.html');
});

let users = []

var value;

io.on('connection', socket => {
	console.log(`socket conectado: ${socket.id}`);

	socket.on('disconnecting', () => {
		users = users.filter(item => item !== value)
	})

	socket.on('sendMessage', data => {
		console.log(data)

		socket.broadcast.emit('receivedMessage', data);
	});
	
	socket.on('nameUserNow', name => {
		nameTxt = name.toString();

		if(users.indexOf(nameTxt) == -1) {
			users.push(nameTxt);
			console.log(users);

			socket.emit('nameIsUsed', false);
		} else {
			console.log("name is used");
			console.log(users);
			
			socket.emit('nameIsUsed', true);
		}
	})

	socket.on('removeThisName', user => {
		value = user;

		users = users.filter(item => item !== value)
	})
})

server.listen(port)
