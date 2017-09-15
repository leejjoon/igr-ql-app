import React, { Component } from 'react';

import * as d3 from "d3";

import { LineChart } from 'react-d3-basic';
import { Xaxis, Yaxis, Xgrid, Ygrid } from 'react-d3-core';
import { Chart, Line, Scatter } from 'react-d3-shape';

import './miniChart.css';

function clone(obj) {
    if (null == obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function get_domain(data, k) {
 var v = data.map((d) => {return d[k]});
 // console.log("domain", data, k);
 v.sort();
 // var v1 = d3.quantile(v, 0.05);
 // var v2 = d3.quantile(v, 0.95);

 var v1 = d3.min(v);
 var v2 = d3.max(v);

 var dv = 0.2 * (v2 - v1);
 var vDomain = [v1 - dv, v2 + dv];

 return vDomain;
}

const get_chart_params = function(data, x_field, y_field) {
 var xDomain = get_domain(data, x_field);
 var yDomain = get_domain(data, y_field);

 console.log(xDomain, yDomain);

 return {xDomain: xDomain, yDomain: yDomain};
}

class MiniChart extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: true};

    // your x accessor
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    // this.setState({hover: true})
  }

  handleMouseLeave(e) {
    // this.setState({hover: false})
  }

  render() {
    var chart_params = get_chart_params(this.props.data, 
					this.props.x_field,
					this.props.y_field);

    console.log("zero", this.props.zero_bottom);
    if (this.props.zero_bottom) {
      chart_params.yDomain[0] = 0;
      console.log("updating yDomain", chart_params.yDomain);
    }

    var _this = this;
    var x_accessor = function(d) {
      return d[_this.props.x_field];
    };


    var chartSeries = [
      {
        field: this.props.y_field,
        name: this.props.y_field,
        color: '#ff7f0e'
      }
    ];

    var chartSeries_scatter = [
      {
        field: this.props.y_field,
        name: this.props.y_field,
        color: '#007f0e',
        symbolSize: 4

      }
    ];

    var svgClassName, xaxis, yaxis;
    if (this.state.hover) {
      svgClassName="miniChartHover";
      xaxis = <Xaxis />;
      yaxis = <Yaxis />;
    } else {
      svgClassName="miniChart";
      xaxis = null;
      yaxis = null;
    }

    var margins_top = clone(this.props.margins);
    // var margins_bottom = clone(this.props.margins);

    /*
         xScale={chart_params.xScale}
         xDomain={chart_params.xDomain}
         yDomain={chart_params.yDomain}
    */

    return (
      <div 
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
        <Chart
         width={this.props.width}
         height={this.props.height}
         margins={margins_top}
         data={this.props.data}
         chartSeries={this.chartSeries}
         x={x_accessor}
         xTickOrient= "top"
         xOrient= "top"
         xDomain={chart_params.xDomain}
         yDomain={chart_params.yDomain}
         xLabel={this.props.x_field}
         yLabel={this.props.y_field}
         svgClassName={svgClassName}
         >
         <Line
           chartSeries= {chartSeries}
         />
         <Scatter
           chartSeries= {chartSeries_scatter}
         />
         {xaxis}
         {yaxis}
         <Xgrid xTickValues={this.props.xTickValues} />
        </Chart>
       </div>
      );
  }
}

export default MiniChart;
