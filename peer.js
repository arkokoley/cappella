var smoke = require('smokesignal');
var fs = require('fs');
var s = require('./getSongs.js');
var Datastore = require('nedb')
  , db = new Datastore({ filename: './xs.st', autoload: true });
var node = smoke.createNode({
  port: 8497
, address: smoke.localIp('192.168.1.6/255.255.255.0') // Tell it your subnet and it'll figure out the right IP for you
, seeds: [{port: 8495, address:'192.168.1.6'}] // the address of a seed (a known node)
})

node.on('connect', function() {
  // Hey, now we have at least one peer!

  // ...and broadcast stuff -- this is an ordinary duplex stream!
  db.find({},function(err,res){
    console.log(res);
    node.broadcast.write(res);
  });
})

node.on('disconnect', function() {
  // Bah, all peers gone.
})

// Broadcast is a stream

process.stdin.pipe(node.broadcast).pipe(process.stdout)
node.on('error', function(e) {throw e})
// Start the darn thing
node.start()
