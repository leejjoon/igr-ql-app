import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

import * as d3 from "d3";

import MiniChart from "./simple_plot";

class DarkSummary extends Component {
  constructor() {
    super();
    this.state = {
      json: null,
    };
  }

  render() {

    var jo_list = this.props.jo_list;

    var std_list = jo_list.map((jo) => 
      {
        return jo.std;
      }
    );

    var stat;

    if (std_list.length > 1) {
      stat = d3.mean(std_list).toFixed(2) + " +- " + d3.deviation(std_list).toFixed(2);
    } else if (std_list.length == 1) {
      stat = d3.mean(std_list).toFixed(2)
    } else {
      stat = "";
    }

    return (
      <div>
       <Segment.Group raised>
        <Segment>
           <Header size='medium'> {this.props.title} </Header>
        </Segment>
        <Segment>
          {stat}
        </Segment>
        <Segment>
          <MiniChart data={jo_list}
	             x_field={"obsid"} y_field={"std"}
                     zero_bottom={true}
                     width={600} height={300}/>
        </Segment>
       </Segment.Group>
      </div>
    )
  }
}

export default DarkSummary;
