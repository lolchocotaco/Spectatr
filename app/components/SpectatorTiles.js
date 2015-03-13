/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons');

// React bootstrap and components
// Props: gameData
//        region
//        name
var RB = require('react-bootstrap'),
    Button = RB.Button,
    api_endpoint = window.document.baseURI;


var Tile = React.createClass({
  render: function() {
    var link = "#",
    btnClass= 'btn btn-block ',
    scriptName ;

    //This is ugly....
    if (this.props.player.gameData.gameId) {
      btnClass += 'btn-success';
      link = api_endpoint + 'spectate/game/'+this.props.player.gameData.gameId+'/'+this.props.player.gameData.spectateKey;
      
      if ( navigator.userAgent.toLowerCase().indexOf('mac') >=0 ) {
        scriptName = 'script.sh';
      } else {
        scriptName = 'script.bat';
      }

    } else {
      btnClass += 'btn-info';
    }

    return (
      <RB.Col sm={3} className="tile voffset">
        <a className={btnClass} href={link} download={scriptName}>
            <div className="playerName">
              <h4>{this.props.player.name}<small className="region"> ({this.props.player.region})</small></h4>
            </div>
            <div className="message">{this.props.player.gameData.message}</div>
        </a>
      </RB.Col>
    );
  }
});


module.exports = React.createClass({
  displayName : 'SpectatorTiles',

  render: function() {
    var teams = {},
        items = [];

    // No players available (loading animation)
    // probably should this be its own component
    if (this.props.players.length <=0 ) {
      return(
        <RB.Row className="center-container">
          <RB.Col className ="center-block" sm={2}>
            <div className='fa fa-spin fa-spinner fa-5x'></div>
          </RB.Col>
        </RB.Row>
      )
    }

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
});
