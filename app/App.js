/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
  RB = require('react-bootstrap'),
  domready = require('domready'),
  SpectatorTiles = require('./components/SpectatorTiles'),
  apiSvc = require('./services/api');

var Spectatr = React.createClass({
  getInitialState: function(){
    return({
      players:[],
      playerFilter : ""
      });
  },

  componentDidMount: function(){
    apiSvc.getPlayers(function(err, players) {
      this.setState({
        players: players
      });
    }.bind(this));
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
              <RB.Input addonBefore={<i className="fa fa-search"></i>} value={this.state.playerFilter} onChange={this.setFilter} type="search" className="form-control" placeholder="Search for Player" />
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
