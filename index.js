var express = require("express");   //Using express
var socket = require("socket.io");  //Using socket.io

//App setup
var app = express();                                        //Create express application
var server = app.listen(4000, function() {                  //Create a server on port 4000 that'll listen for requests
    console.log("Listening for requests on port 4000");
})

//Static files
app.use(express.static("public"));                          //Serve a static page

//Socket setup
var io = socket(server);                                    //Socket.io works on server we created and waits for a client to make a connection and set ub a websocket btw the two

io.on("connection", function(socket) {                      //Listens out for an event called connection (When there's a connection from a browser). 'socket' is the specific socket btw the client making the connection and the server
    console.log("Made socket connection", socket.id);

    //Recieve emitted chat data and emit it to every connected socket 
    socket.on("chat", function(data) {
        io.sockets.emit("chat", data);
    });

    //Recieve emitted typing data and emit it to every connected socket except for the one that emitted the data
    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });
});  