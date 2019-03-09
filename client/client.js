const IP = "127.0.0.1";
const PORT = 1203;
const socket = new WebSocket("ws://" + IP + ":" + PORT);

var showConsole = true;
var messageBox;
function windowLoaded(){
    toggleConsole();
    messageBox = document.getElementById("message");
}

function toggleConsole(){
    showConsole = !showConsole;
    var cons = document.getElementById("console");
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
        var data = JSON.stringify({
            type: "message",
            data: messageBox.value
        })

        socket.send(data);
    }
}

document.onkeydown = keypress
window.onload = windowLoaded;