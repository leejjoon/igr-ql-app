import React, { Component } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { Container, Image, Segment, Grid, Header } from 'semantic-ui-react'

class Dark extends Component {
  constructor() {
    super();
    this.state = {
      json: null,
    };
  }

  render() {

    var jo = this.props.jo;

    var rootdir = this.props.rootdir;

    var _v;
    var imurl;

    if ("dark_hist_2comp.png" in jo["binaries"]) {
      _v = jo["binaries"]["dark_hist_2comp.png"];
      imurl = rootdir + "/" + _v[1];
    } else {
      _v = jo["binaries"]["dark_hist_1comp.png"];
      imurl = rootdir + "/" + _v[1];
    }

    return (
      <div>
       <Segment.Group raised>
        <Segment>
          <Grid divided='vertically'>
            <Grid.Column width={4}>
              <ReactJson src={jo} collapsed={1}
               name="info"
               enableClipboard={false} displayDataTypes={false} />
            </Grid.Column>
            <Grid.Column width={4}>
               <Image src={imurl}/>
            </Grid.Column>
          </Grid>
        </Segment>
       </Segment.Group>
      </div>
    )
  }
}

export default Dark;
