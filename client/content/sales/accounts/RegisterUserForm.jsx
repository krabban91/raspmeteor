import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



export default class RegisterUserForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			'username':'',
			'password1':'',
			'password2':'', 
			'errorText':'',
		};
  	}

	onUsernameChange = (event) =>
		this.setState({username:event.target.value});
	onPassword1Change = (event) =>
		this.setState({password1:event.target.value});
	onPassword2Change = (event) =>
		this.setState({password2:event.target.value, errorText:''});	
	afterCreation = (err) => {
		FlowRouter.go("/sales/login");			
	}

	submit = (event)  => {
		event.preventDefault();
		if(this.state.password2 == this.state.password1){
			let id = Accounts.createUser({username:this.state.username, password:this.state.password1}, this.afterCreation);
		}
		else {
			this.setState({errorText:'Lösenorden matchar inte.'});
		}
	}


	render(){
		return (
				<div className = "login-outer" >
					<div className ="login-inner">
						<h2>Registera en ny användare</h2>
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
								value={this.state.password1}
								onChange={this.onPassword1Change}
								fullWidth={true}
								required={true}
							/>
							<TextField
								floatingLabelText="Repetera lösenord"
								type='password'
								value={this.state.password2}
								onChange={this.onPassword2Change}
								errorText={this.state.errorText}
								fullWidth={true}
								required={true}
							/>
							<br/>
							<RaisedButton
								label="Registrera"
								type='submit'
								fullWidth={true}
							/>
						</form>
					</div>
				</div>
			);
	}
}


