/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
  RB = require('react-bootstrap'),
  Button = RB.Button,
  masonry = require('masonry-layout'),
  apiSvc = require('../services/api');


var Tile = React.createClass({
  getInitialState: function() {
    if(this.props.player.gameData) return (this.props.player.gameData);
    return({});
  },
  render: function() {
    var link = "#";
    var btnClass= 'btn btn-block '

    //This is ugly....
    if ( !(this.state.status) ) {
      btnClass +='btn-default';
    } else {
      if (this.state.gameId) {
        btnClass +='btn-success';
        link = 'http://'+this.props.player.region+'.op.gg/match/observer/id='+this.state.gameId;
      } else{
        btnClass +='btn-info';
      }
    }

    return(
      <RB.Col sm={3}>
        <a className={btnClass} href={link}>
            <div className="playerName">
              <h4><small>{this.props.player.region}/</small>{this.props.player.name}</h4>
            </div>
            <div className="message">{this.state.message} </div>
        </a>
      </RB.Col>
    )
  }
});


module.exports = React.createClass({
  displayName : 'SpectatorTiles',
  render: function(){
    var teams = {},
      items = [];

    var filteredPlayers = this.props.players.filter(function(player, ind) {
      return (player.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0 )
    }.bind(this));

    // Split teams
    filteredPlayers.forEach(function (player, ind) {
      if ( !teams[player.team] ) {
        return teams[player.team] = [player];
      }
      teams[player.team].push(player);
    });

    // Render tiles to team group
    for(var teamName in teams) {
      var players = teams[teamName].map(function(player, ind) {
        return(<Tile player={player} key={ind} />);
      });

      items.push(<RB.Panel bsStyle="primary" key={items.length} header={teamName}> {players} </RB.Panel>);
    }

    return (
      <RB.Row id="container">
        {items}
      </RB.Row>
    )
  }
})

// className="js-masonry" data-masonry-options='{ "columnWidth": 200, "itemSelector": ".tile" }'
