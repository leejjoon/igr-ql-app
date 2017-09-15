import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Button } from 'semantic-ui-react'
import { Container, Header, Divider } from 'semantic-ui-react'

import ReactJson from 'react-json-view'

import Dark from './dark';
import DarkSummary from './dark_summary';

import Target from './target';
import TargetSummary from './target_summary';

import Flat from './flat';
import FlatSummary from './flat_summary';

const ButtonExampleEmphasis = () => (
  <div>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
  </div>
)

class App extends Component {
  constructor() {
    super();
    this.state = {
      ql_list: [],
    };

    this.obsdate = null;

    this.tick = this.tick.bind(this);
  }

  initObsdate(obsdate) {
    this.setState({ql_list: []});
    this.json_map =  {};
    this.type_map = {};
    this.obsdate = obsdate;
  }

  componentDidMount() {
    /* 
    this.serverRequest = this.request_index_json();
    */
    console.log("in didMount");
    this.initObsdate(this.props.match.params.obsdate);
    this.timer = setInterval(this.tick, 1000);

  }

  componentWillReceiveProps(nextProps) {

    clearInterval(this.timer);

    if (nextProps.obsdate !== this.obsdate) {
      console.log("new obsdate", nextProps.obsdate);
      this.initObsdate(nextProps.obsdate);
    }

    this.tick = this.tick.bind(this);

  }

  componentWillUnmount() {

    clearInterval(this.timer);
    /* this.serverRequest.abort(); */
  }

  add_item(ql, data) {
     var basename = ql["basename"];
     this.json_map[basename] = data;

     this.setState(function(prevState, props){
       // prevState.ql_list.reverse();
       prevState.ql_list.push(ql["basename"]);
       // prevState.ql_list.splice(0, 0, ql["basename"]);
       prevState.ql_list.sort();
       // prevState.ql_list.reverse();
       return {ql_list: prevState.ql_list}
     });

  }

  fetch_item(ql, src) {
    var _this = this;
    this.serverRequest = 
      axios
        .get(src)
        .then(function(result) {
          _this.add_item(ql, result.data);
        });
  }

  update_ql_list(ql_list) {

    var state_ql_list = this.state.ql_list;

    var new_qls = ql_list.filter((ql) => !state_ql_list.includes(ql["basename"]));

    var _this = this;

    new_qls.forEach(function(ql) {
       var basename = ql["basename"];
       _this.type_map[basename] = ql;
       var url = "/html/" + _this.obsdate + "/" + basename + ".json";
       _this.fetch_item(ql, url);
    });

    
  }

  request_index_json() {

    if (this.obsdate) {
      var _this = this;
      var url = "/html/" + this.obsdate + "/index.json";
      return axios.get(url)
                  .then(function(result) {
                     _this.update_ql_list(result.data.ql_list);
                   });
    } else {
      console.log("obsdate not defined");
    }
  }

  tick() {
    console.log("tick");
    this.serverRequest = this.request_index_json();

  }

  tick2() {
    console.log("tick");
    this.add_item("test1"  + Math.random(), {});

  }


  makeSummaryElement(r, group_data) {
    var obsid_list = group_data.map((jo) => jo.obsid);
    var k = r.objtype + ":" + obsid_list.join("-");
    var section_title = r.object + " : " + obsid_list.join("-");

    if (r.objtype === "dark") {
     return (
       <div>
         <Divider hidden/>
         <Container key={k}>
           <DarkSummary jo_list={group_data}
                        title={section_title}/>
         </Container>
       </div>
     );
    } else if (r.objtype === "flat") {
     return (
         <Container key={k}>
           <FlatSummary jo_list={group_data}
                        title={section_title}/>
         </Container>
     );
    } else {
     return (
       <div>
         <Divider hidden/>
         <Container key={k}>
           <Header size='medium'> {section_title} </Header>
           <TargetSummary jo_list={group_data}/>
         </Container>
       </div>
     );
    }
  }


  compareGroup(grp1, grp2) {

    // name:"", objtype:""}
    console.log("compare", grp1, grp2);
    if ((grp1.object === grp2.object) 
        && (grp1.exptime === grp2.exptime) 
       )
    {
      console.log("objtype", grp1.objtype, grp1);
      if ((grp1.objtype === "flat")
          && (grp1.frmtype !== grp2.frmtype)) {
         return true;
      }

      return false;
    }

    return true;

  }


  render() {
    // console.log("match", this.props.match.params.obsdate);

    // var obsdate = this.props.match.params.obsdate;
    var ql_list = this.state.ql_list;
    /*
    var qls = ql_list.slice().reverse().map((basename) => 
      {
        var r = this.type_map[basename];
        var c;
        var root = "/html/" + obsdate + "/";

        if (r["objtype"] === "dark") {
           c = <Dark jo={this.json_map[basename]} rootdir={root}/>
        } else if (r["objtype"] === "tar") {
           c = <Target jo={this.json_map[basename]} rootdir={root}/>
        }
        console.log(r["objtype"]);

        return (
           <Container key={basename}>
            <Header size='medium'> {basename} : {r["objtype"]} {r["frametype"]} </Header>
            {c}
           </Container>
        );
      }
    );
    */

    var qls = [];
    var prev_group = {}
    var group_data = []

    for (var i = 0, len = ql_list.length; i < len; i++) {
      var basename = ql_list[i];
      var r = this.type_map[basename];

      // start grouping

      if (this.compareGroup(prev_group, r)) {
        if (group_data.length) {
          console.log("new group");

          var e = this.makeSummaryElement(prev_group, group_data);

          qls.splice(0, 0, e);
          group_data = [];

        }

        prev_group = r;

      }

      group_data.push(this.json_map[basename]);
      // end grouping


        var c;
        var root = "/html/" + this.obsdate + "/";

        if (r["objtype"] === "dark") {
           c = <Dark obsdata={r} jo={this.json_map[basename]} rootdir={root}/>
        } else if (r["objtype"] === "flat") {
           c = <Flat obsdata={r} jo={this.json_map[basename]} rootdir={root}/>
        } else if (r["objtype"] === "tar") {
           c = <Target obsdata={r} jo={this.json_map[basename]} rootdir={root}/>
        }
        console.log(r["objtype"]);

        var e = (
           <Container key={basename}>
            {c}
           </Container>
        );
        qls.splice(0, 0, e);

    }

    if (group_data.length) {
      var e = this.makeSummaryElement(prev_group, group_data);

      qls.splice(0, 0, e);
    }


    return (
     <div>
       <h2> {this.obsdate} </h2>
       {qls}
     </div>
    );
  }

}

export default App;
