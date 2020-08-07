var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose=require('mongoose');
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
mongoose.connect('mongodb+srv://fuat:123e-vend456@cluster0.f8y8n.mongodb.net/Messages?retryWrites=true&w=majority',{useMongoClient: true} )
	.then(()=> {
		console.log('mongodb bağlantısı sağlandı');
	
	})
	.catch((err)=>{
		console.log('mongodb bağlantı hatası.');
	
	});
io.on('connection', (socket) => {
  socket.on('chat message', (msg)=> {
  	console.log('Message: '+msg);
	io.emit('chat message',msg);
  })
  socket.on('disconnect',(socket)=> {
  	console.log('user disconnect');
  })
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
