/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
    RB = require('react-bootstrap'),
    Button = RB.Button,
    domready = require('domready'),
    async = require('async'),
    SpectatorTiles = require('./components/SpectatorTiles'),
    apiSvc = require('./services/api');

var Spectatr = React.createClass({

  getInitialState: function() {
    return({
      players:[],
      playerFilter : ""
    });
  },

  updatePlayerState: function() {
    // Go back to a loading state
    this.setState({
      players: []
    });

    // Get updated player states
    var self = this;
    apiSvc.getPlayers(function (err, players) {
      async.each(players, function (player, cb) {
        apiSvc.getData(player.region, player.name, function(err, data) {
          if (err) return cb(err);
          player.gameData = data;
          return cb(null)
        });
      }, function (err) {
        if (err) return console.log(err);

        self.setState({
          players : players
        })
      });
    });
  },

  componentDidMount: function() {
    // Get state for players
    this.updatePlayerState();
  },

  setFilter: function(e) {
    this.setState({
      playerFilter: e.target.value
    })
  },

  render: function () {
    return (
      <div className="container">
        <RB.PageHeader> {this.props.title} </RB.PageHeader>
        <RB.Row className="voffset2">
          <RB.Col sm={4} xsOffset={4}>
              <RB.Input addonBefore={<div className="fa fa-search"></div>} value={this.state.playerFilter} onChange={this.setFilter} type="search" className="form-control" placeholder="Search for Player" />
          </RB.Col>
          <RB.Col xsOffset={11}>
            <Button bsStyle="primary" onClick={this.updatePlayerState}>Refresh</Button>
          </RB.Col>
        </RB.Row>
        <SpectatorTiles filter={this.state.playerFilter} players={this.state.players}/>
      </div>
    );
  }
});

domready(function () {
  window.React = React;
  React.render(<Spectatr title='Spectatr' />, document.body);
});
