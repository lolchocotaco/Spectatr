/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons');

// React bootstrap and components
// Props: gameData
//        region
//        name
var RB = require('react-bootstrap'),
    Button = RB.Button;

var Tile = React.createClass({
  render: function() {
    var link = "#",
    btnClass= 'btn btn-block '

    //This is ugly....
    if (this.props.player.gameData.gameId) {
      btnClass += 'btn-success';
      link = 'http://' + this.props.player.region + '.op.gg/match/observer/id=' + this.props.player.gameData.gameId;
    } else{
      btnClass += 'btn-info';
    }

    return (
      <RB.Col sm={3} className="voffset">
        <a className={btnClass} href={link}>
            <div className="playerName">
              <h4><small>{this.props.player.region}/</small>{this.props.player.name}</h4>
            </div>
            <div className="message">{this.props.player.gameData.message}</div>
        </a>
      </RB.Col>
    );
  }
});


module.exports = React.createClass({
  displayName : 'SpectatorTiles',
  render: function(){
    var teams = {},
      items = [];

    console.log(this.props.players.length);
    if (this.props.players.length <=0 ) {
      return(
        <RB.Row>
          <RB.Col className ="center-block" lg={3}>
            <i className='fa fa-spin fa-spinner fa-5x'></i>
          </RB.Col>
        </RB.Row>
      )
    }


    // COMMENT OUT WHEN YOU FIGURE OUT THE SPINNY THING
    // var filteredPlayers = this.props.players.filter(function(player, ind) {
    //   return (player.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0 )
    // }.bind(this));
    //
    // // Split teams
    // filteredPlayers.forEach(function (player, ind) {
    //   if ( !teams[player.team] ) {
    //     return teams[player.team] = [player];
    //   }
    //   teams[player.team].push(player);
    // });
    //
    // // Render tiles to team group
    // for(var teamName in teams) {
    //   var players = teams[teamName].map(function(player, ind) {
    //     return(<Tile player={player} key={ind} />);
    //   });
    //
    //   items.push(<RB.Panel bsStyle="primary" key={items.length} header={teamName}> {players} </RB.Panel>);
    // }
    //
    // return (
    //   <RB.Row id="container">
    //     {items}
    //   </RB.Row>
    // )
  }
});
