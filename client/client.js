const IP = "127.0.0.1";
const PORT = 1203;
const socket = new WebSocket("ws://" + IP + ":" + PORT);

var showConsole = true;
var messageBox;
var chat;
var cons;

function incomingMessage(data){
    log(data);
    var JSONdata = JSON.parse(data);
    var htmlMessage = "<p style=\"color: " + JSONdata.color + "\">" + JSONdata.user + ": " + JSONdata.data + "</p>"
    log(htmlMessage);
    chat.innerHTML = chat.innerHTML + htmlMessage
}

function sendMessage(){
    var data = JSON.stringify({
        type: "message",
        data: messageBox.value
    })

    socket.send(data);
    messageBox.value = "";
}

function windowLoaded(){
    cons = document.getElementById("console");
    chat = document.getElementById("chatMessages");
    toggleConsole();
    messageBox = document.getElementById("message");
    socket.onmessage = function(ev){incomingMessage(ev.data)};
    socket.onopen = log("Connection established");
    socket.onerror = log("WebSocket error!");
}

function log(message){
    console.log(message);
    cons.value += "\n" + message;
}

function toggleConsole(){
    showConsole = !showConsole;
    var fullscreen = document.getElementById("fullscreen");
    if(showConsole){
        cons.style.visibility = "visible";
        fullscreen.style.padding = "200px 0px 20px";
    }else{
        cons.style.visibility = "hidden";
        fullscreen.style.padding = "0px 0px 20px";
    }
}

function keypress(evt){
    evt = evt || window.event;
    if (evt.keyCode == 119) {
        toggleConsole();
    }else if(evt.keyCode == 13){
        //Send message!
        sendMessage();
    }
}

document.onkeydown = keypress
window.onload = windowLoaded;