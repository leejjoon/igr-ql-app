import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

import ImageHoverSwitch from "./ImageHoverSwitch"


class Target extends Component {
  constructor() {
    super();
    this.state = {
      json: null,
    };
  }

  render() {

    var jo = this.props.jo;
    var obsdata = this.props.obsdata;

    var rootdir = this.props.rootdir;

    var _v;

    _v = jo["binaries"]["stacked_profile.png"];
    var imurl1 = rootdir + "/" + _v[1];

    _v = jo["binaries"]["slit_profile_per_order.png"];
    var imurl1_on_hover = rootdir + "/" + _v[1];

    _v = jo["binaries"]["slit_stat_per_order.png"];
    var imurl2 = rootdir + "/" + _v[1];

    // var _v = jo["binaries"]["dark_hist_2comp.png"];
    // var imurl2 = rootdir + "/" + _v[1];
    console.log(obsdata);

    return (
      <div>
       <Segment.Group raised>
        <Segment>
            <Header size='small'> {obsdata["frametype"]} :  </Header>
        </Segment>
        <Segment>
          <Grid divided='vertically'>
            <Grid.Column width={4}>
              <ImageHoverSwitch src={imurl1} src_on_hover={imurl1_on_hover}/>
            </Grid.Column>
            <Grid.Column width={4}>
               <Image src={imurl2}/>
            </Grid.Column>
          </Grid>
        </Segment>
       </Segment.Group>
      </div>
    )
  }
}

export default Target;
