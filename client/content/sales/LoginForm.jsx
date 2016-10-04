import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Session} from 'meteor/session';

import MuiTheme from '../../theme.jsx'


export default class LoginForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			'username':'',
			'password':'',
			'errorText':'', 
		};
  	}
	onUsernameChange = (event) =>
		this.setState({username:event.target.value});
	onPasswordChange = (event) =>
		this.setState({password:event.target.value});
	
	afterLogin = (err, res) => {
		if(err){
			this.setState({errorText:"Could not log in."});
			return;
		}
		console.log(Meteor.user());
		FlowRouter.go("/sales");
	}

	submit = (event)  => {
		event.preventDefault();
		if(Meteor.user()){
			Meteor.logout();
		}
		Meteor.loginWithPassword(this.state.username, this.state.password, this.afterLogin);
	}


	render(){
		return (
	         <MuiThemeProvider muiTheme={MuiTheme}>
				<div className = "login-outer" >
					<div className ="login-inner">
						<h2>Logga in för att fortsätta</h2>
						<form onSubmit = {this.submit}>
							<TextField
								floatingLabelText="Användarnamn"
								value={this.state.username}
								onChange={this.onUsernameChange}
								fullWidth={true}
								required={true}
							/>
							<br/>
							<TextField
								floatingLabelText="Lösenord"
								type='password'
								value={this.state.password}
								onChange={this.onPasswordChange}
								fullWidth={true}
								required={true}
								errorText={this.state.errorText}
							/>
							<br/>
							<RaisedButton
								label="Logga in"
								type='submit'
								primary={true}
								fullWidth={true}
							/>
						</form>
					</div>
				</div>
          	</MuiThemeProvider>
			);
	}
}


