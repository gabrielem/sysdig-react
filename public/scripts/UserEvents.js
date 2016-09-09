window.UserEvents = React.createClass({
  getInitialState: function() { return {
    filterType : "none"
  } },


  /*
    Get the json from the API end Point
  */
  filterData: function(filterType){
    console.log("filterType");
    console.log(filterType);
    //this.state.filterType = filterType
    this.setState({
      filterType : filterType
    });


  },

  fetchData: function(){

    console.log("fetchData");

    this.serverRequest = $.get(this.props.source, function (result) {
      /*
        Set the state passing the events array
      */
      this.setState({
        lastEvents : result.events
      });

      $(".timeline").animate({ width: "100%" }, 30000, function(){
          $( this ).css("width","0%");
      });

    }.bind(this));
  },

  componentDidMount: function() {
    /*
      Fetch data first
    */
    this.fetchData();

    /*
      Fetch data every 30 seconds
    */
    var _this = this
    setInterval(function(){

      _this.fetchData();
    }, 30000);


  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },



  render: function() {

    var that = this
    //console.log("that -------"); console.log(that);
    console.log("this.state.filterType");
    console.log(this.state.filterType);


    var filterType = this.state.filterType;
    var events_in_the_last_minute = 0;
    var events_in_the_last_hour = 0;

    //console.log(this.state.events_in_the_last_minute);

    if(this.state.lastEvents){
      return (
        <div className="tableContainer">



          <RefreshBtn fetchData={this.fetchData} />


          {this.state.lastEvents.forEach(function(event){
            //console.log("event"); console.log(event);
            //console.log("that"); console.log(that);
            if(event.timestamp<=1471615596 && event.timestamp>=1471615536){
              events_in_the_last_minute ++
            }


            if(event.timestamp<=1471615596 && event.timestamp>=1471611966){
              events_in_the_last_hour ++
            }

            //1471615596
          }) }

          <SummaryTable filterData={that.filterData} events_in_the_last_minute={events_in_the_last_minute}  events_in_the_last_hour={events_in_the_last_hour}/>

          <UserEventsRowHeader />

          {this.state.lastEvents.map(function(event){
            /*
              Check the state of the filter
              ---
            */
            //last_minute last_hour
            //if(this.state.filterType=="last_minute")
            //console.log("that.state.filterType"); console.log(that.state.filterType);

            console.log("Start the switch: ");
            console.log(filterType);

            switch(filterType) {
                case "last_minute":
                    if(event.timestamp<=1471615596 && event.timestamp>=1471615536){
                        return  <UserEventsRow key={event.id} event={event} />;
                    }
                    break;
                case "last_hour":
                    //code block
                    break;
                default: return  <UserEventsRow key={event.id} event={event} />;
            }


          })}
        </div>
      );
    }else{
      return (
        <div>

          <Loading />

        </div>
      );
    }

  }

});
