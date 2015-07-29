var knex = require('./db.js');

//knex.migrate().then(function(){
  //knex.createArtists(["Linkin Park"]).then(function(res){
    knex.getArtists().then(console.log);
   //console.log(res);
  //});
//});
