/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
  RB = require('react-bootstrap'),
  masonry = require('masonry-layout'),
  apiSvc = require('../services/api');


var Tile = React.createClass({
  getInitialState: function() {
    return({});
  },
  componentDidMount: function(){
    var self = this;
    apiSvc.getData(this.props.player.region, this.props.player.name, function(err, data) {
      console.log(data);
      self.setState(data);
    });
  },
  render: function() {
    var link;
    if (this.state.gameId) {
      // TODO: figure out how to make an actual link
      link = <a href="{this.state.gameId} {this.state.spectateKey}">Click meh</a>;
    }

    return(
      <a href="#">
        <div className="tile w3">
          {this.props.player.region} <br/>
          {this.props.player.name} <br/>
          {this.state.message} <br/>
          {link}
        </div>
      </a>
    )
  }
});


module.exports = React.createClass({
  displayName : 'SpectatorTiles',
  getInitialState: function() {
    return ({
      players: []
    });
  },
  componentDidMount: function() {
    // This will be a function to get other stuff
    this.setState({
      players :[
        {
          name: 'HippoBirth',
          region: 'na'
        },
        {
         name: 'LikelyToDie',
         region: 'na'
       }]
    });
  },
  render: function(){
    var tiles = this.state.players.map(function (player, ind) {
      return(<Tile player={player} key={ind} />);
    });

    return (
      <div id="container" className="js-masonry" data-masonry-options='{ "columnWidth": 200, "itemSelector": ".tile" }'>
        {tiles}
      </div>
    )
  }
})
