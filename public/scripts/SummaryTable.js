

window.SummaryTable = React.createClass({

  render: function() {

    var that = this

    return (
      <div className="row summary">

        <div className="col-md-4 text-center">
          <i className="fa fa-time"></i>
          <a href="#" onClick={function(){that.props.filterData("last_minute")}}>
            events in the last minute: <br /> {this.props.events_in_the_last_minute}
          </a>


        </div>

        <div className="col-md-4 text-center">
          <i className="fa fa-time"></i>
          <a href="#" onClick={function(){that.props.filterData("last_hour")}}>
            events in the last hour: <br /> {this.props.events_in_the_last_hour}
          </a>
        </div>

      </div>
    );
  }
});
