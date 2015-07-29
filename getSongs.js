var fs = require("fs")
var glob = require("glob")
var Promise = require("promise");
var mm = require("musicmetadata");
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./cappella.sqlite"
  }
});

function buildLibrary(path){
  var songs = [];
    return new Promise(function(resolve,reject){
    glob(path + "/**/*.mp3",function(err,files){
      var keys = Object.keys(files);
      var i = 0;
      if (i < files.length)
        doCall(files[i]);
      else
        resolve(songs);
      function doCall(file){
        var parser = new mm(fs.createReadStream(file), function (err,metadata) {
          if(metadata){
            metadata.location = file;
            metadata.artist = JSON.stringify(metadata.artist);
            metadata.albumartist = JSON.stringify(metadata.albumartist);
            metadata.disk = JSON.stringify(metadata.disk);
            metadata.track = JSON.stringify(metadata.track);
            //metadata.user = "current";
            knex('songs').insert(metadata).then(console.log);
          }
          i++;
          if(i < keys.length)
            return doCall(files[i]);
          else{
            //console.log(songs);
            resolve(songs);
          }
        });
      }
    });
  });
}
module.exports = {
  buildLibrary: buildLibrary
};
buildLibrary("/home/arkokoley/Music/Music");
