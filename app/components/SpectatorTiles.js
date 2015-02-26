/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
  RB = require('react-bootstrap'),
  Button = RB.Button,
  masonry = require('masonry-layout'),
  apiSvc = require('../services/api');


var Tile = React.createClass({
  getInitialState: function() {
    return({});
  },

  componentDidMount: function(){
    var self = this;
    apiSvc.getData(this.props.player.region, this.props.player.name, function(err, data) {
      self.setState(data);
    });
  },

  render: function() {
    var link = "#";

    //This is ugly....
    if ( !(this.state.status) ) {
      btnClass='btn-default';
    } else {
      if (this.state.gameId) {
        btnClass='btn-success';
        link = 'http://'+this.props.player.region+'.op.gg/match/observer/id='+this.state.gameId;
      } else{
        btnClass='btn-info';
      }
    }

    return(
      <a className="btn" href={link}>
        <Button className={btnClass}>
          <div className="playerName">
            <h3><small>{this.props.player.region}/</small>{this.props.player.name}</h3>
          </div>
          <div className="message">{this.state.message} </div>
        </Button>
      </a>
    )
  }
});


module.exports = React.createClass({
  displayName : 'SpectatorTiles',
  render: function(){
    var teams = {},
      items = [];
    this.props.players.forEach(function (player, ind) {
      if ( !teams[player.team] ) {
        return teams[player.team] = [player];
      }
      teams[player.team].push(player);
      // return(<Tile player={player} key={ind} />);
    });

    for(var teamName in teams) {
      var players = teams[teamName].map(function(player, ind) {
        return(<Tile player={player} key={ind} />);
      });
      items.push(<RB.Panel bsStyle="primary" key={items.length} header={teamName}> {players} </RB.Panel>);
    }

    return (
      <div id="container" className="js-masonry" data-masonry-options='{ "columnWidth": 200, "itemSelector": ".tile" }'>
        {items}
      </div>
    )
  }
})
