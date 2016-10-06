import React, {Component, PropTypes} from 'react';

import { Meteor } from 'meteor/meteor';


import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import {List, ListItem,MakeSelectable} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


import AppBar from 'material-ui/AppBar';

const SelectableList = MakeSelectable(List); 


export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
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
                <ListItem 
                  primaryText="Historia" 
                  value={"/history"} 
                  href={"/history"} 
                  />
                <ListItem 
                  primaryText="Tidigare raspar" 
                  value={"/previous"} 
                  href={"/previous"} 
                  />
                <ListItem 
                  primaryText="Köp rasp" 
                  value={"/buy"} 
                  href={"/buy"} 
                  />
                <ListItem
                  primaryText="Partners"
                  value={"/partners"}
                  href={"/partners"}
                />
                <ListItem 
                  primaryText="Kontakt"
                  value={"/contact"}
                  href={"/contact"}
                />
                {Meteor.user() ?
                  <ListItem 
                      primaryText="Försäljning"
                      value={"/sales"}
                      href={"/sales"}
                  />
                    : ''
                }
                
              </SelectableList>
              {Meteor.user() ? 
                  <Divider/>
                  : ''
                }
              {Meteor.user() ? 
                  <MenuItem 
                    onClick={this.logOut} 
                    primaryText="Logga ut"
                  />
                  : ''
                }
            </Drawer>
        </div>
    );
  }
}
