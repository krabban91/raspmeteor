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
import Checkbox from 'material-ui/Checkbox';

import Dialog from 'material-ui/Dialog';

import {Goals} from '/both/collections/goals.js'
import {SalesTotal} from '/both/collections/sales.js'
import {SalesInformation} from '/both/collections/salesInformation.js'
import {Properties} from '/both/collections/properties.js'

const SelectableList = MakeSelectable(List); 


class EditSaleSettings extends Component {
	constructor(props){
		super(props);
		this.state= {currentTab:'information', 
			selectedInfo:'', 
			currentInfo:undefined, 
			infoDialogOpen:false, 
			selectedGoal:'', 
			currentGoal:undefined, 
			goalDialogOpen:false, 
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
	handleGoalListSelect = (event, newMenuItem) => {
		if(newMenuItem!='new'){
			this.setState({selectedGoal: newMenuItem, currentGoal: this.props.goals.find((goal) => {return goal._id==newMenuItem;})});
		}
		else{
			Meteor.call('goals.add');
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
			<div className='flowInverseRow'>
				<RaisedButton 
		    		onTouchTap={this.handleRemoveInfoButton}
		    		label='Ta bort'
					/>
			</div>
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

	onEditGoalName = (event) => {
		let goal = this.state.currentGoal;
		goal.name=event.target.value
		this.setState({currentGoal:goal});
		Meteor.call('goals.update', goal);
	}
	onEditGoalAmount = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)){return;}
		let goal = this.state.currentGoal;
		goal.amountOfRasps=value.length>0?parseInt(value):''
		this.setState({currentGoal:goal});
		if(!isNaN(goal.amountOfRasps)){
			Meteor.call('goals.update', goal);
		}
	}
	onEditGoalDescription = (event) => {
		let goal = this.state.currentGoal;
		goal.description=event.target.value
		this.setState({currentGoal:goal});
		Meteor.call('goals.update', goal);
	}

	onGoalAchieveCheck = (event, value) => {
		let goal = this.state.currentGoal;
		Meteor.call('goals.setAchieved', goal._id, value);		
		goal.isAchieved = value;
		goal.dateAchieved = value? new Date(): undefined;
		this.setState({currentGoal:goal});
	}
	onGoalShowDescCheck = (event, value) => {
		let goal = this.state.currentGoal;
		goal.showDescription = value;
		this.setState({currentGoal:goal});
		Meteor.call('goals.update', goal);
	}
	

	handleRemoveGoalButton = () => {
		this.setState({goalDialogOpen:true});
	}
	handleRemoveGoalCancel = () => {
		this.setState({goalDialogOpen:false});
	}
	handleRemoveGoalConfirm = () => {
		Meteor.call('goals.remove', this.state.selectedGoal);
		this.setState({goalDialogOpen:false, selectedGoal:'', currentGoal: undefined});
	}

	renderEditGoalCard(goal){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveGoalCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveGoalConfirm}
				/>
		];
		return (<div className='paperMargin'>
			<h4>Försäljningsmål-id: {goal._id}</h4>
			{goal.isAchieved ?(<h6>{moment(goal.dateAchieved).calendar()}</h6>):''}
			<div>Totalt har {this.props.SalesInfo.total} raspar av {this.props.properties.totalAmountOfRasps} sålts.</div>
			<div className='flexFlow'>
				<div className='flexGrow'>
					<TextField
	    	    		value={goal.name}
	    	    		onChange={this.onEditGoalName}
						floatingLabelText='Namn'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={goal.amountOfRasps}
	    	    		onChange={this.onEditGoalAmount}
						floatingLabelText='Antal raspar sålda'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={goal.description}
	    	    		onChange={this.onEditGoalDescription}
						floatingLabelText='Beskrivning'
						multiLine={true}
	    	    		/>
				</div>
			</div>
			<Checkbox
				value={goal.showDescription}
				checked={goal.showDescription}
				onCheck={this.onGoalShowDescCheck}
				label='Visa beskrivning innan målet avklarat'
				labelPosition='right'
				/>
			<Checkbox
				value={goal.isAchieved?goal.isAchieved:false}
				checked={goal.isAchieved?goal.isAchieved:false}
				disabled={!(this.props.SalesInfo && this.props.SalesInfo.total >= goal.amountOfRasps) && !goal.isAchieved}
				onCheck={this.onGoalAchieveCheck}
				label='Målet uppfyllt och belönat'
				labelPosition='right'
				/>
			<div className='flowInverseRow'>
				<RaisedButton 
		    		onTouchTap={this.handleRemoveGoalButton}
		    		label='Ta bort'
					/>
			</div>
			<Dialog
	    		title={'Ta bort entitet : '+goal._id}
	    		modal={true}
	    		open={this.state.goalDialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort detta mål? 
	    	</Dialog>
		</div>);
	}

	render () {
		return (<div>
			<Paper className='paperPadding'>
				<h2>Försäljningsinformation</h2>
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
						<Paper 
							className='overflowY redaxListContainer'
							rounded={false}
						>
							<SelectableList 
					                value = {this.state.selectedGoal}
					                onChange={this.handleGoalListSelect}
					              	>
					              	<ListItem 
					                  primaryText="Lägg till" 
					                  value={"new"} 
					                  rightIcon={<AddIcon color={fullWhite}/>}
					                  />
		    	    				<Divider/>
					                {this.props.goals? this.props.goals.map((goal)=>{return this.renderListItem(goal);}):''}
					            </SelectableList>
		        			</Paper>
			            <div className='editImageContainer'>
			            	{this.state.currentGoal?this.renderEditGoalCard(this.state.currentGoal):''}
		            	</div>
	            	</div>
				</Tab>
			</Tabs>
			</Paper>
		</div>) 
	};

}

export default createContainer( () => {
	Meteor.subscribe('salesInformation');
	Meteor.subscribe('goals');
	Meteor.subscribe('salesTotal');
	Meteor.subscribe('properties');
	return {
		news : SalesInformation.find({},{sort:{createdAt:-1}}).fetch(),
		goals : Goals.find({},{sort:{amountOfRasps: 1}}).fetch(),
		SalesInfo : SalesTotal.findOne(),
		properties : Properties.findOne(), 
	};
}, EditSaleSettings);