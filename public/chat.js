//In this file, we want to establish the connection to the server to create a websocket btw the server and the client

//Make connection
var socket = io.connect("http://localhost:4000");

//Query DOM
var output = document.getElementById("output")
    handle = document.getElementById("handle"),
    message = document.getElementById("message"),
    button = document.getElementById("send"),
    feedback = document.getElementById("feedback");

//Emit events 
button.addEventListener("click", function() {      //When the button is clicked, send an object that contains the message through the socket
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener("keypress", function() {
    socket.emit("typing", handle.value);
})

//Listen for chat data
socket.on("chat", function(data) {
    //Modify lines of code of the elements
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

//Listen for typing data
socket.on("typing", function(data) {
    //Adds lines of code to the output element
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});