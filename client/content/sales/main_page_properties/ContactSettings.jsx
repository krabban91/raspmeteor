import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AddIcon from 'react-material-icons/icons/content/add';

import {fullWhite} from 'material-ui/styles/colors';


import {Redax} from '/both/collections/redax.js'

const SelectableList = MakeSelectable(List); 


class ContactSettings extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedRedax: '', 
			currentRedax: undefined,
			dialogOpen:false,
		};
	}

	handleListSelect = (event, newMenuitem) => {
		if(newMenuitem=='new'){
			Meteor.call('redax.add', (err, redaxId) => {
				if(err){
					console.log(err);
					return;
				}
				this.setState({selectedRedax: redaxId, currentRedax: this.props.redax.find((person) => {return person._id==redaxId;})});
			});
		} 
		else {
			this.setState({selectedRedax: newMenuitem, currentRedax: this.props.redax.find((person) => {return person._id==newMenuitem;})});
		}
	}

	onEditNumber = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		let entity = this.state.currentRedax;
		entity.roleNumber= (value.length>0?parseInt(value):'')
		this.setState({currentRedax:entity});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('redax.update', entity);
		}
	}
	onEditTitle = (event) => {
		let value = event.target.value;
		let entity = this.state.currentRedax;
		entity.title= value;
		this.setState({currentRedax:entity});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('redax.update', entity);
		}
	}
	onEditName = (event) => {
		let value = event.target.value;
		let entity = this.state.currentRedax;
		entity.name= value;
		this.setState({currentRedax:entity});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('redax.update', entity);
		}
	}
	onEditEmail = (event) => {
		let value = event.target.value;
		let entity = this.state.currentRedax;
		entity.emailAddress= value;
		this.setState({currentRedax:entity});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('redax.update', entity);
		}
	}
	onEditPhone = (event) => {
		let value = event.target.value;
		let entity = this.state.currentRedax;
		entity.phoneNumber= value;
		this.setState({currentRedax:entity});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('redax.update', entity);
		}
	}

	handleRemoveButton = (event) => {
		this.setState({dialogOpen:true});
	}
	handleRemoveCancel = (event) => {
		this.setState({dialogOpen:false});
	}
	handleRemoveConfirm = (event) => {
		Meteor.call('redax.remove', this.state.selectedRedax);
		this.setState({dialogOpen:false, selectedRedax:'', currentRedax: undefined});
	}

	renderEditMemberInfo(member) {
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveConfirm}
				/>

		];
		return (
			<Paper className='paperPadding'>
        	    <h3>Database entry: {member._id}</h3>
        	    <Divider/>
    	    	
    	    	<div className='flexFlow'>
	    	    	<div className='flexGrow'>
		    	    	<TextField
		    	    		value={member.roleNumber}
		    	    		onChange={this.onEditNumber}
							floatingLabelText='Nummer (ordf = 1)'
		    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
		    	    	<TextField
		    	    		value={member.title}
		    	    		onChange={this.onEditTitle}
							floatingLabelText='Titel (PR-chef)'
		    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
		       	    	<TextField
		    	    		value={member.name}
		    	    		onChange={this.onEditName}
							floatingLabelText='Namn (Adrian Scrubbinsson)'
		    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
		       	    	<TextField
		    	    		value={member.emailAddress?member.emailAddress:''}
		    	    		onChange={this.onEditEmail}
							floatingLabelText='Mailaddress (rasp@redax.se)'
		    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
		       	    	<TextField
		    	    		value={member.phoneNumber?member.phoneNumber:''}
		    	    		onChange={this.onEditPhone}
							floatingLabelText='Telefonnummer (###-### ## ##)'
		    	    		/>
	    	    	</div>
    	    	</div>
				<div className='flowInverseRow'>	
	    	    	<RaisedButton
	    	    		onTouchTap={this.handleRemoveButton}
	    	    		label='Ta bort'/>
    	    	</div>
    	    	<Dialog
    	    		title={'Ta bort entitet : '+member._id}
    	    		modal={true}
    	    		open={this.state.dialogOpen}
    	    		contentStyle={modalStyle}
    	    		actions={actionButtons}
    	    		>
    	    		Är du säker på att du vill ta bort denna medlem? 
    	    	</Dialog>
        	</Paper>)
	}

	renderRedaxListItem(member) {
		return (<ListItem 
			primaryText={member.title}
			secondaryText={member.name}
			value={member._id}
			key={member._id}
			/>);
	}

	render () {
		return (
			<div>
				<Paper className='paperPadding'>
					<h2>Inställningar: Sittande Raspredaktionen</h2>
	        	    <Divider/>
					Här justeras inställningarna kring vilka i Raspredax som visas på hemsidan. 
					Informationen här visas upp under kontakt-delen på hemsidan.
	        	</Paper>

				<div className='flexBox'>
					<Paper className='overflowY redaxListContainer paperPadding'>
						<SelectableList 
			                value = {this.state.selectedImage}
			                onChange={this.handleListSelect}
			              	>
			              	<ListItem 
			                  primaryText="Lägg till" 
			                  value={"new"} 
			                  rightIcon={<AddIcon color={fullWhite}/>}
			                  />
    	    				<Divider/>
			                {this.props.redax.map((member) => {return this.renderRedaxListItem(member);})}
			            </SelectableList>
        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentRedax?this.renderEditMemberInfo(this.state.currentRedax):''}
	            	</div>
				</div>
			</div>) 
	};

}
ContactSettings.PropTypes = {
	redax: PropTypes.array.isRequired,
}


export default createContainer( () => {
	Meteor.subscribe('redax');
	return {
		redax : Redax.find({}, {sort: {roleNumber: 1}}).fetch(),
	}
}, ContactSettings);