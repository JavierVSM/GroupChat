let socket = io( 'http://localhost:8080' );

var getName = prompt("Your name:"); 

$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();

    let userMessage = $( '#userMessage' ).val();

    let send = {
        name: getName,
        message: userMessage
    };

    socket.emit( 'sendMessage', send );
});

socket.on( 'sendAll', function( data ){
    let newMessage = `<p> ${data.name}: ${data.message} </p>`;
    $( '.messageBox' ).append( newMessage );
});

socket.on('conversationHistorial', function(conversation){
    for(let i=0; i<conversation.length; i++){
        let historial = `<p>${conversation[i].name} :  ${conversation[i].message}</p>`;
        $('.messageBox').append(historial);
    }
});