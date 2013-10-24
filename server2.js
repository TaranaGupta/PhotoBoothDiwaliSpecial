
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var path = require('path');

var HTTP_OK = 200,
HTTP_ERR_UNKNOWN = 500,
HTTP_ERR_NOT_FOUND = 404;

//
//var PeerKeys = ['wuj7m1v1esjug14i', 'r9js183u66rpmn29'];
//var keynum = 0;
var videoSide = ['left', 'right'];
var sideNum = 0;

httpServer.listen(8080);

function requestHandler(req, res) {
	
	var filepath =  (req.url == '/' ? 'index7.html' : './images' +req.url) ,
	fileext = path.extname(filepath); 
	console.log("Request for " + filepath+ " received.");

	fs.exists(filepath, function (f) {
		console.log(f);
		if (f) {

			fs.readFile(filepath, function (err, content) {
				if (err) {
					res.writeHead(HTTP_ERR_UNKNOWN);
					res.end();
				} else {
					res.writeHead(HTTP_OK, contentType(fileext));
					res.end(content);
				}
			});
		} else {
			res.writeHead(HTTP_ERR_NOT_FOUND);
			res.end();
		}
	});
}

function contentType(ext) {
	var ct;

	switch (ext) {
		case '.html':
		ct = 'text/html';
		break;
		case '.css':
		ct = 'text/css';
		break;
		case '.js':
		ct = 'text/javascript';
		break;
		case '.png':
		ct = 'image/png';
		break;
		default:
		ct = 'text/plain';
		break;
	}

	return {'Content-Type': ct};
}



// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);


// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
		//console.log("We have a new client: " + socket.id);
		// When this user "send" from clientside javascript, we get a "message"
		// client side: socket.send("the message");  or socket.emit('message', "the message");
		/*
		socket.on('uservideo', 
			// Run this function when a message is sent
			function (data) {
				//console.log("message: " + data);
				// Call "broadcast" to send it to all clients (except sender), this is equal to
				socket.broadcast.emit('otheruservideo', data);
				//socket.broadcast.send(data);
				// To all clients, on io.sockets instead
				// io.sockets.emit('message', "this goes to everyone");
			}
		);
		*/
		//sending peer key to the new client
		//keynum = (keynum+1)%2;
		//socket.emit('peerkey', PeerKeys[keynum]);
		socket.emit('videoside', videoSide[sideNum]);
		sideNum = (sideNum+1)%2;


		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('finalimage', function(data) {
			// Data comes in as whatever was sent, including objects
			//sconsole.log("Received: 'image' ");
			//io.sockets.emit('finalimage',data);
			socket.broadcast.emit('finalimage',data);
		});
		
		//receiving and broadcasting the peer ids
		socket.on('peer_id', function(data) {
			// Tell everyone my peer_id
			socket.broadcast.emit('peer_id',data);
		});

		socket.on('face_id', function(data) {
			// Tell everyone my face_id
			socket.broadcast.emit('face_id',data);
		});
		//socket.on('disconnect', function() {
		//	console.log("Client has disconnected");
		//}
		//);
	}
);


