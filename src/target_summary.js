import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

import * as d3 from "d3";

import MiniChart from "./simple_plot";

class TargetSummary extends Component {
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
        var slit_length_arcsec = jo.per_order.slit_length_arcsec;
        var dl = jo.per_order["50%"]
        return {obsid: jo["obsid"],
                ew: d3.median(dl, (d) => {return d[1].equivalent_width * slit_length_arcsec}),
                height: d3.max(dl, (d) => {return d[1].height})};
      }
    );

    console.log("Target Summary");
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
              <MiniChart data={k_list} x_field={"obsid"} y_field={"height"}
                         zero_bottom={true}
                         width={500} height={300}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <MiniChart data={k_list} x_field={"obsid"} y_field={"ew"}
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

export default TargetSummary;
