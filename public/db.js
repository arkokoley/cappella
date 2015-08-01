var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './cappella.db'
    }
  });
var promise = require('promise');
function createArtists(artists){
  console.log(artists);
  return promise.all(artists.map(function(artist){
    return new promise(function(resolve,reject){
      console.log(artist);
      knex.select().from('artists').where({name:artist})
      .then(function(res){
        if(res.length <= 0){
          resolve(knex.insert({name:artist}).into('artists'));
        }
        else{
          resolve([res[0].id]);
        }
      });
    });
  }));
}
module.exports = {
  migrate: function(){
    return knex.schema.createTable('songs', function (table) {
      table.increments();
      table.string('title');
      table.string('artist');
      table.string('albumartist');
      table.string('album');
      table.integer('year');
      table.string('track');
      table.string('disk');
      table.string('genre');
      table.integer('duration');
      table.string('location');
      table.string('src');
      table.string('picture');
      table.timestamps();
    }).createTable('config',function(table){
      table.increments();
      table.string('key');
      table.string('value');
    }).createTable('artists',function(table){
      table.increments();
      table.string('name');
      table.string('picture');
      table.string('info');
    })
  },
  createArtists: createArtists,
  getSongs: function(query){
    return new promise(function(resolve,reject){
    knex.select().from('songs').where(query || {})
      .then(function(res){
        for(var i in res){
          res[i].artist = JSON.parse(res[i].artist);
          res[i].albumartist = JSON.parse(res[i].albumartist);
          res[i].track = JSON.parse(res[i].track);
          res[i].disk = JSON.parse(res[i].disk);
        }
        return resolve(res);
      });
    });
  },
  getArtists: function(query){
    return promise.resolve(knex.select()
        .from('artists').where(query || {}));
  },
  putSongs: function(songs){
    return promise.all(songs.map(function(song){
      createArtists(JSON.parse(song.artist)).then(function() {
        return knex.insert(song).into('songs');
      }).catch(console.log.bind(console));
    }));
  },
  checkDB: function () {
    return knex.raw("SELECT 1 FROM songs LIMIT 1");
  }
};
