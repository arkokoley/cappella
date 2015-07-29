/** @jsx React.DOM */
var DataStore = require('nedb'),
  db = new DataStore({filename: "./../cappella.db",autoload:true});
var React = require('react');
var songs = React.createClass({displayName: "songs",
  render: function(docs){
    var items = [];
      for(var i=0; i< docs.length; i++){
        var doc = docs[i];
        console.log(doc);
        items.push(<div class="mdl-cell mdl-cell--3-col">
              <div class="mdl-card mdl-shadow--2dp demo-card-square">
                <div class="mdl-card__title mdl-card--expand">
                  <h2 class="mdl-card__title-text">{{ doc }}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                  <h5>{{ doc }}</h5><br/>
                  {{ doc }}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                  <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="playThis('{{ doc }}')">
                    Play
                  </a>
                </div>
              </div>
              </div>);
      }
    });
    return React.createElement("div", {class: "mdl-grid"}, items);
  }
})
db.find({},function(err,data){
  React.render(React.createElement(songs, {data: docs}), document.getElementById("songs"));
});
