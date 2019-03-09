const WebSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer(function(req, res) { 
    
});

const PORT = 1203;

var messages = [];
var users = [];

server.listen(PORT, (req, res) => {});
console.log('Listening on port ' + PORT + '...')
const wsServer = new WebSocketServer({httpServer: server});

wsServer.on('request',(request) => {
    const connection = request.accept(null, request.origin);

    var index = users.push(connection) - 1;
    var userName = false;
    var color = false;
    connection.on('message', (data) => {
        JSONdata = JSON.parse(data.utf8Data);
        if(!userName){
            userName = JSONdata.data;
            color = '601010';
            console.log("Username: " + userName);
            sendTo(index, JSON.stringify({type: "message", data: "You are now known as: " + userName, user: "Server", color: "50FF50", admin: true}));
            sendToAll(JSON.stringify({type: "message", data: userName + " has joined.", user: "Server", color: "50FF50", admin: true}))
        }else{
            //Save message and send it
            var message = JSONdata.data;
            var compositeMessage = JSON.stringify({type: "message", data: message, user: userName, color: color, admin: false});
            messages.push(compositeMessage);
            messages = messages.slice(-20);
            console.log(userName + ": " + message );
            sendToAll(compositeMessage);
        }
    });
    connection.on('close', (data) => {
        console.log(userName + " has left the room.");
        users.splice(index, 1);
        sendToAll(JSON.stringify({type: "message", data: userName + " has left the room.", user: "Server", color: "50FF50", admin: true}))
    });

});

function sendToAll(data){
    for(i = 0 ; i < users.length ; i++){
        users[i].sendUTF(data);
    }
}

function sendTo(index, data){
    users[index].sendUTF(data);
}

