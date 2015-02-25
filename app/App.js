/** @jsx React.DOM */
/* global document, window */
var React = require('react/addons'),
  RB = require('react-bootstrap'),
  domready = require('domready'),
  SpectatorTiles = require('./components/SpectatorTiles'),
  apiSvc = require('./services/api');

var Spectatr = React.createClass({
  getInitialState: function(){
    return({players:[]});
  },

  componentDidMount: function(){
    apiSvc.getPlayers(function(err, players) {
      this.setState({
        players: players
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="container">
        <h1> {this.props.title} </h1>
        <SpectatorTiles players={this.state.players}/>
      </div>
    );
  }
});

domready(function () {
  window.React = React;
  React.render(<Spectatr title='Spectatr' />, document.body);
});
