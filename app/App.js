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

  getPlayerData : function () {
    var self = this;
    apiSvc.getAllData(function (err, players) {
      if (err) return console.error(err);

      self.setState({
        players : players
      });
    });
  },

  componentDidMount: function(){
    // Checks every 1 minute for game updates.
    // Initial Getting of data
    this.getPlayerData();
    // Scheduling for every minute
    setInterval( this.getPlayerData, 60000);
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
            <Button bsStyle="primary" onClick={this.getPlayerData}>Refresh</Button>
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
