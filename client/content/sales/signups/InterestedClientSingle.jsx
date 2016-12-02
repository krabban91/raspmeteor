import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class InterestedClientSingle extends Component {
	constructor(props){
		super(props);
		this.state= {dialogOpen:false}
	}


	static propTypes = {
		document:PropTypes.object,
		currentUser:PropTypes.object,
	}

	onRemoveClick = () =>
	{
		this.setState({dialogOpen:true});
	}
	onRemoveCancel = () =>
	{
		this.setState({dialogOpen:false});
		
	}
	onRemoveConfirm = () =>
	{
		Meteor.call('subscribers.remove',this.props.document._id);
		this.setState({dialogOpen:false});
		FlowRouter.go('/sales/signups/clients');
	}


	onIsContactedChanged = (event, isInputChecked) => {
		if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
			Meteor.call('subscribers.changeContactedStatus', {clientId:this.props.document._id, isContacted:isInputChecked});
		}
	}

	render() {
	    return (
			<div className="container">
				<Paper className='paperPadding' rounded={false}>
					<h2>Intresserad kund</h2>
	        	    
	        	    <Divider/>
	        	    {this.props.document?(<p>
		        	    Id: {this.props.document._id}</p>):''}
	        	</Paper>
        		{this.props.document?(
	        	<div className='flexFlow vertical'>
	        		<Paper className='paperPadding' rounded={false}>
	        			<table><tbody>
	        				<tr>
	        					<td>
	        						Namn
	        					</td>
	        					<td>
	        						{this.props.document.name}
	        					</td>
	        				</tr>
	        				<tr>
	        					<td>
	        						Mailaddress
	        					</td>
	        					<td>
	        						{this.props.document.email?this.props.document.email:''}
	        					</td>
	        				</tr>
	        				<tr>
	        					<td>
	        						Är kontaktad?
	        					</td>
	        					<td>
	        						{Roles.userIsInRole(Meteor.userId(), ['admin'])?
										(<Checkbox
											checked={this.props.document.isContacted?this.props.document.isContacted:false}
											onCheck={this.onIsContactedChanged}
										/>):
										this.props.document.isContacted?'Ja':'Nej'
									}
	        					</td>
	        				</tr>
	        			</tbody></table>
	        			{this.renderRemoveDialog()}
	        		</Paper>
		        </div>
        		):''}
			</div>
		);
	}



	renderRemoveDialog(){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.onRemoveCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.onRemoveConfirm}
				/>
		];
		return <div>
			<RaisedButton
				label="Ta bort"
				style={{float:'right', margin:30}}
				onTouchTap={this.onRemoveClick}
				/>
			<Dialog
	    		title={'Ta bort kunden : '+this.props.document._id}
	    		modal={true}
	    		open={this.state.dialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort den här kunden? 
			</Dialog>
		</div>
	}
}
