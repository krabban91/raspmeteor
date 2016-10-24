import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Subscribe extends Component {
	constructor(props){
		super(props);
		this.state= {
			name : '', 
			email : '',
			isSubmitted: false,
		};
	}

	onMoreClick = (event) => {
		this.setState({isSubmitted:false});
	}

	onNameChange = (event) =>{
		this.setState({name: event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onSubmitCallback = (err,res) => {
		if(err){
			console.log(err);
		}else {
			this.setState({name:'', email:'', isSubmitted:true});
		}
	}

	handleSubmission = (event) => {
		event.preventDefault();
		Meteor.call('subscribers.insert', {name: this.state.name, email:this.state.email}, this.onSubmitCallback);
	}

	render() {
	    return (
			<div className="container">
				<Paper className='paperPadding' rounded={false}>
					<h2>Köp Rasp för guds skull </h2>
	        	    <Divider/>
					Prenumerera på Rasp så riskerar du inte att bli utan!
	        	</Paper>

	        	<Paper className='paperPadding' rounded={false}>
					<h3>Anmäl dig här och så kontaktar vi dig om vidare information</h3>
	        		{this.state.isSubmitted?(
	        			<div>
	        				<div>
	        				Tack för att du anmälde dig.
							</div>
							<div>
							<RaisedButton
								label='anmäl fler?'
								onTouchTap={this.onMoreClick}
								/>
							</div>
	        			</div>
	        		):
	        		(<form onSubmit={this.handleSubmission}>
	        			<div className='flexFlow'>
							<div className='flexGrow'>
			        			<TextField
									floatingLabelText='Namn'
									value={this.state.name}
									onChange={this.onNameChange}
									required={true}
									/>
							</div>
							<div className='flexGrow'>
								<TextField
									floatingLabelText='Email'
									value={this.state.email}
									onChange={this.onEmailChange}
									required={true}
									/>
							</div>
						</div>
						<RaisedButton
							label='Skicka in'
							fullWidth={true}
							type='submit'
							/>
	        		</form>
	        		)}
	        	</Paper>
			</div>
		);
	}
}
