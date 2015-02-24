var apiSvc = require('../services/api');


var Tile = React.createClass({
  componentDidMount: function(){
    apiSvc.getData(this.props.player.region, this.props.player.name, function(data) {
      this.setState(data)
    })
  },

  render: function(){
    return(
      <div className="tile">
        <a href={this.state.playerLink}/>Click Here</a>
        {this.state.message}
      </div>
    )
  }
});



module.exports = React.createClass({
  componentDidMount: function(){
    this.setState({
      players :[
        {
          name: 'Faker',
          region: 'KR'
        },
        {
         name: 'LikelyToDie',
         region: 'NA'
       }]
    });
  },
  render: function(){
    var tiles = this.state.players.map(function (player) {
      return(<Tile player={player}/>);
    })

    return: (
      <div id="container" class="js-masonry" data-masonry-options='{ "columnWidth": 200, "itemSelector": ".tile" }'>

      </div>
    )
  }
})
