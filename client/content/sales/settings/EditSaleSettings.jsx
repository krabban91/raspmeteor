import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem,MakeSelectable} from 'material-ui/List';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import AddIcon from 'react-material-icons/icons/content/add';
import {fullWhite} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';

import {SalesInformation} from '/both/collections/salesInformation.js'


const SelectableList = MakeSelectable(List); 


class EditSaleSettings extends Component {
	constructor(props){
		super(props);
		this.state= {currentTab:'information', 
			selectedInfo:'', 
			currentInfo:undefined, 
			infoDialogOpen:false, 
		};
	}

	handleInfoListSelect = (event, newMenuItem) => {
		if(newMenuItem!='new'){
			this.setState({selectedInfo: newMenuItem, currentInfo: this.props.news.find((info) => {return info._id==newMenuItem;})});
		}
		else{
			Meteor.call('salesInformation.add');
		}
	}
	onTabChange = (value) => {
		if (typeof(value) == 'string'){
			this.setState({currentTab:value});
		}
	}

	renderListItem(item){
		return <ListItem 
			primaryText={item.name}
			value={item._id}
			key={item._id}
			/>;
	}

	onEditInfoName = (event) => {
		let info = this.state.currentInfo;
		info.name=event.target.value
		this.setState({currentInfo:info});
		Meteor.call('salesInformation.update', info);
	}
	onEditInfoContent = (event) => {
		let info = this.state.currentInfo;
		info.content=event.target.value
		this.setState({currentInfo:info});
		Meteor.call('salesInformation.update', info);
	}
	

	handleRemoveInfoButton = () => {
		this.setState({infoDialogOpen:true});
	}
	handleRemoveInfoCancel = () => {
		this.setState({infoDialogOpen:false});
	}
	handleRemoveInfoConfirm = () => {
		Meteor.call('salesInformation.remove', this.state.selectedInfo);
		this.setState({infoDialogOpen:false, selectedInfo:'', currentInfo: undefined});
	}

	renderEditInfoCard(info){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveInfoCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveInfoConfirm}
				/>
		];

		return (<div className='paperMargin'>
			<h4>Nyhets-id: {info._id}</h4>
			<h6>{moment(info.createdAt).calendar()}</h6>
			<div className='flexFlow'>
				<div className='flexGrow'>
					<TextField
	    	    		value={info.name}
	    	    		onChange={this.onEditInfoName}
						floatingLabelText='Rubrik'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={info.content}
	    	    		onChange={this.onEditInfoContent}
						floatingLabelText='innehåll'
						multiLine={true}
	    	    		/>
				</div>
			</div>
			<RaisedButton 
	    		onTouchTap={this.handleRemoveInfoButton}
	    		label='Ta bort'
				/>
			<Dialog
	    		title={'Ta bort entitet : '+info._id}
	    		modal={true}
	    		open={this.state.infoDialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort denna nyhet? 
	    	</Dialog>
		</div>);
	}

	render () {
		return (<div>
			<Paper className='paperPadding'>
				Välkommen. Här fixas Försäljningsinställningarna. 
			</Paper>
			<Paper  style={{marginRight:25, marginBottom:25}}>
			<Tabs 
				onChange={this.onTabChange}
				value={this.state.currentTab} 
				>
				<Tab 
					label='Försäljningsinformation'
					value='information'
					>
					<div className='flexBox'>
					<Paper 
						className='overflowY redaxListContainer'
						rounded={false}
					>
						<SelectableList 
				                value = {this.state.selectedInfo}
				                onChange={this.handleInfoListSelect}
				              	>
				              	<ListItem 
				                  primaryText="Lägg till" 
				                  value={"new"} 
				                  rightIcon={<AddIcon color={fullWhite}/>}
				                  />
	    	    				<Divider/>
				                {this.props.news? this.props.news.map((info)=>{return this.renderListItem(info);}):''}
				            </SelectableList>
	        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentInfo?this.renderEditInfoCard(this.state.currentInfo):''}
	            	</div>
            	</div>
				</Tab>
				<Tab 
					label='Säljmål'
					value='goals'
					>
					<div className='flexBox'>
	            	</div>
				</Tab>
			</Tabs>
			</Paper>
		</div>) 
	};

}

export default createContainer( () => {
	Meteor.subscribe('salesInformation');
	return {
		news : SalesInformation.find({},{sort:{createdAt:-1}}).fetch(),
	};
}, EditSaleSettings);