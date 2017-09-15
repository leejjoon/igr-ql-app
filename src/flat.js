import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

class Flat extends Component {
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

    _v = jo["binaries"]["center_cut_profile.png"];
    var imurl1 = rootdir + "/" + _v[1];

    _v = jo["binaries"]["center_cut_profile_by_order.png"];
    var imurl2 = rootdir + "/" + _v[1];

    return (
      <div>
       <Segment.Group raised>
        <Segment>
            <Header size='small'> {obsdata["frametype"]} :  </Header>
        </Segment>
        <Segment>
          <Grid divided='vertically'>
            <Grid.Column width={4}>
              <Image src={imurl1}/>
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

export default Flat;
