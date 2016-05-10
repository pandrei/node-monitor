//client.js
var io = require('socket.io-client');
var monitor = require("os-monitor");

var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function(socket) {
    console.log('Connected!');
});
monitor.start();monitor.start({ delay: 3000 // interval in ms between monitor cycles
              , freemem: 1000000000 // freemem under which event 'freemem' is triggered
              , uptime: 1000000 // number of secs over which event 'uptime' is triggered
              , critical1: 0.7 // loadavg1 over which event 'loadavg1' is triggered
              , critical5: 0.7 // loadavg5 over which event 'loadavg5' is triggered
              , critical15: 0.7 // loadavg15 over which event 'loadavg15' is triggered
              , silent: false // set true to mute event 'monitor'
              , stream: true // set true to enable the monitor as a Readable Stream
              , immediate: true // set true to execute a monitor cycle at start()
              });

function timeout() {
  setTimeout(function() {
    monitor.on('monitor', function(event) {
      socket.emit('CH01', 'me', JSON.stringify(event));
    });
    timeout();
  }, 10000);
}

timeout();
