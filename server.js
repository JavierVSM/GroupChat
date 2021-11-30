const express = require( 'express' );
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(8080);

const io = require( 'socket.io' )( server );

let conversation = [];

io.on( 'connection', function( socket ){

    socket.emit('conversationHistorial', conversation);

    socket.on( 'sendMessage', function( data ){
        conversation.push(data);
        io.sockets.emit( 'sendAll', data ); 
    });   
});