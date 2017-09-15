import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

import * as d3 from "d3";

import MiniChart from "./simple_plot";

class FlatSummary extends Component {
  constructor() {
    super();
    this.state = {
      json: null,
    };
  }

  render() {

    var jo_list = this.props.jo_list;

    var k_list = jo_list.map((jo) => 
      {
        var dl = jo.peak_list;
        return {obsid: jo["obsid"],
                peak: d3.max(dl, (d) => {return d.peak})};
      }
    );

    console.log("Flat Summary");
    console.log(k_list);

    var stat;

    return (
      <div>
       <Segment.Group raised>
        <Segment>
          {""}
        </Segment>
        <Segment>

          <Grid divided='vertically'>
            <Grid.Column width={8}>
              <MiniChart data={k_list} x_field={"obsid"} y_field={"peak"}
                         zero_bottom={true}
                         width={500} height={300}/>
            </Grid.Column>
          </Grid>

        </Segment>
       </Segment.Group>
      </div>
    )
  }
}

export default FlatSummary;
