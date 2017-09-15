import React, { Component } from 'react';

import { Image } from 'semantic-ui-react'


class ImageHoverSwitch extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    this.setState({hover: true})
  }

  handleMouseLeave(e) {
    this.setState({hover: false})
  }

  render() {
    var imurl;

    if (this.state.hover) {
      imurl = this.props.src_on_hover;
    } else {
      imurl = this.props.src;
    }

    return (
      <div 
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
        <Image src={imurl}/>
      </div>
    );
  }
}

export default ImageHoverSwitch;
