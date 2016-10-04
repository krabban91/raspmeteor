import React, {Component, PropTypes} from 'react';

import { Meteor } from 'meteor/meteor';
import { Session} from 'meteor/session';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import {List, ListItem,MakeSelectable} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


import AppBar from 'material-ui/AppBar';

const SelectableList = MakeSelectable(List); 


export default class SalesTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentDidMount(){

  }
  static propTypes = {
      location : PropTypes.string.isRequired,
  };


  handleToggle = (event, newMenuitem) => this.setState({open: !this.state.open});

  logOut = (event) => {
    Meteor.logout(function(err){
      FlowRouter.redirect('/');
    });
    this.setState({open: false});
  };

  render() {
    const {
      location,
    } = this.props;
    return (
        <div>
            <AppBar
              title="Rasp"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap = {this.handleToggle}
            />
            <Drawer 
              open={this.state.open}
              >
              <IconButton onClick={this.handleToggle} ><NavigationClose /></IconButton>
              <SelectableList 
                value = {location}
                onChange={this.handleToggle}
              >
                <ListItem 
                  primaryText="Hem" 
                  value={"/"} 
                  href={"/"}
                  />
                <Divider/>
                <ListItem 
                  primaryText="Försäljningsinformation" 
                  value={"/sales"} 
                  href={"/sales"} 
                  />
                {Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin','seller']) ? (<ListItem 
                  primaryText="Rapportera" 
                  value={"/sales/new"} 
                  href={"/sales/new"} 
                  />):''}
                {Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin','seller']) ? (<ListItem 
                  primaryText="Överblick" 
                  value={"/sales/summary"} 
                  href={"/sales/summary"} 
                  />):''}
                {Meteor.user() && Roles.userIsInRole(Meteor.user(), ['admin']) ? (
                  <ListItem 
                  primaryText="Hantera användare" 
                  value={"/sales/handleusers"} 
                  href={"/sales/handleusers"} 
                  />):''}
              </SelectableList>
              <Divider/>
              <MenuItem 
                onClick={this.logOut} 
                primaryText="Logga ut"
              />
            </Drawer>
        </div>
    );
  }
}
