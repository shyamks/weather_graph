import React, { Component } from 'react';
import currentDayForecast from '../../../currentDayForecast.json'
import rcl from "react-chart-line";


class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxTemp: 0,
            minTemp: 0,
            chart: {}
        };

        this.findTemp = this.findTemp.bind(this);
        this.todaysGraph = this.todaysGraph.bind(this);
    }

    findTemp(event) {
      var tempState = this.state;
      console.log(this.state);
      fetch("http://api.openweathermap.org/data/2.5/forecast?q=Bangalore,IN&appid=f88fba802451f66f3d78712df3daccf4",
    )
      .then((resp) =>  resp.json())
      .then((response) =>{
        if (response.cod !== "200"){
          response = currentDayForecast;
        }

        var maxTemp = {temp:0},minTemp = {temp:1000};
        for (let data in response.list ){
          if (maxTemp.temp < response.list[data].main.temp ){
            maxTemp.temp = response.list[data].main.temp
          }
          if (minTemp.temp > response.list[data].main.temp ){
            minTemp.temp = response.list[data].main.temp
          }
        }
        tempState.maxTemp = maxTemp.temp;
        tempState.minTemp = minTemp.temp;
        this.setState(tempState);
      });

    }

    todaysGraph(e){
      fetch("http://api.openweathermap.org/data/2.5/forecast?q=Bangalore,IN&appid=f88fba802451f66f3d78712df3daccf4")
      .then((resp) =>  resp.json())
      .then((response) =>{
        if (response.cod !== "200"){
          response = currentDayForecast;
        }
        var points = [];
        var chart = { msg: "Temp chart", osX: [], osY: [] };

        for (let data in response.list ){
          chart.osX.push(response.list[data].dt_txt);
          chart.osY.push(response.list[data].main.temp);
        }
        var tempState = this.state;
        tempState.chart = chart;
        this.setState(tempState);
      });
    }




    render() {
      var chart =<div/>
      var points = (this.state.chart);
      if (points.msg){
        chart = <rcl.ChartLine data={points}/>;
      }

        return (
            <div>
                <button onClick={this.findTemp}>Click to know temp</button>
                <p>Maxtemp is {this.state.maxTemp}F</p>
                <p>Mintemp is {this.state.minTemp}F</p>
                <br/>
                <h4> Temp Graph</h4>
                <button onClick={this.todaysGraph}>Click For Graph</button>
                {chart}
            </div>
        );
    }

}

export default Weather;
