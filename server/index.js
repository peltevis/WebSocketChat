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
    var admin = false;
    connection.on('message', (data) => {
        if(!userName){
            userName = data.utf8Data;
            color = '601010';
            console.log("Username: " + userName);
        }else{
            //Save message and send it
            var message = data.utf8Data;
            var compositeMessage = JSON.stringify({type: "message", user: userName, color: color, admin: admin});
            messages.push(compositeMessage);
            messages = messages.slice(-20);
            console.log(userName + ": " + message );
            sendToAll(compositeMessage);
        }
    });
    connection.on('close', (data) => {
        console.log(userName + " has left the room.");
        users.splice(index, 1);
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

