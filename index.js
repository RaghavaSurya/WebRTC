navigator.webkitGetUserMedia({ video: true, audio: true }, function (stream) {

    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    });

    peer.on('signal', function (data) {
        document.getElementById('yourId').value = JSON.stringify(data);
        console.log(data);
    })

    document.getElementById('connect').addEventListener('click', function () {
        var othersId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(othersId);
    })

    document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage);
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream',function(stream){
       document.getElementById('streamingVideo').src=window.URL.createObjectURL(stream)        
    })
}, function (err) {
    console.error(err);
})