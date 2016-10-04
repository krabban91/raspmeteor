import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn} from 'material-ui/Table';

import HandleUserSingle from './HandleUserSingle.jsx';

import MuiTheme from '../../../theme.jsx'


export default class HandleUsers extends Component {
	constructor(props) {
	    super(props);
  	}

  	static propTypes = {
  		listOfUsers: PropTypes.array.isRequired,
  	}

  	onRemoveTap = (userId, event) => {
  		console.log(userId);
  		console.log(event);
  		Meteor.call('users.remove', {userId:userId});
  		
  	}

	render(){
		return (
			<div className = "login-outer" >
				<div className ="login-inner">
					<Table>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Användarnamn</TableHeaderColumn>
								<TableHeaderColumn>Rättigheter</TableHeaderColumn>
								<TableHeaderColumn className='small'>Ta bort användare</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.props.listOfUsers.map((user)=> {return (
								<HandleUserSingle 
									key={user._id}
									user={user}
									onRemove = {this.onRemoveTap}
								/>);})}
								}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
  Meteor.subscribe('users');

  return {
    listOfUsers: Meteor.users.find({}, {sort : {createdAt : -1 } }).fetch(),
  };
}, HandleUsers);


