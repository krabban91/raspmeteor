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


import {PreviousPartners} from '/both/collections/previousPartners.js';
import {PartnerDeals as PDeals} from '/both/collections/partnerDeals.js';
import {ExampleAds} from '/both/collections/exampleAds.js';


const SelectableList = MakeSelectable(List); 


class EditPartnerDeals extends Component {
	constructor(props){
		super(props);
		this.state= {currentTab:'deals', 
			selectedDeal:'', 
			currentDeal:undefined, 
			dealDialogOpen:false, 
			selectedExample:'',
			currentExample:undefined, 
			exampleDialogOpen:false, 
			selectedPrevious:'',
			currentPrevious:undefined,
			previousDialogOpen:false, 
		};
	}

	handleDealListSelect = (event, newMenuItem) => {
		if(newMenuItem!='new'){
			this.setState({selectedDeal: newMenuItem, currentDeal: this.props.deals.find((deal) => {return deal._id==newMenuItem;})});
		}
		else{
			Meteor.call('partnerDeals.add');
		}
	}
	handleExampleListSelect = (event, newMenuItem) => {
		if(newMenuItem!='new'){
			this.setState({selectedExample: newMenuItem, currentExample: this.props.examples.find((example) => {return example._id==newMenuItem;})});
		}
		else{
			Meteor.call('exampleAds.add');

		}
	}
	handlePreviousListSelect = (event, newMenuItem) => {
		if(newMenuItem!='new'){
			this.setState({selectedPrevious: newMenuItem, currentPrevious: this.props.previous.find((prev) => {return prev._id==newMenuItem;})});
		}
		else{
			Meteor.call('previousPartners.add');
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

	onEditDealName = (event) => {
		let deal = this.state.currentDeal;
		deal.name=event.target.value
		this.setState({currentDeal:deal});
		Meteor.call('partnerDeals.update', deal);
	}
	onEditDealType = (event) => {
		let deal = this.state.currentDeal;
		deal.type=event.target.value
		this.setState({currentDeal:deal});
		Meteor.call('partnerDeals.update', deal);
	}
	onEditDealDescription = (event) => {
		let deal = this.state.currentDeal;
		deal.description=event.target.value
		this.setState({currentDeal:deal});
		Meteor.call('partnerDeals.update', deal);
	}
	onEditDealPrice = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		let deal = this.state.currentDeal;
		deal.price = (value.length>0?parseInt(value):'');
		this.setState({currentDeal:deal});
		if(!isNaN(entity.roleNumber)){
			Meteor.call('partnerDeals.update', deal);
		}
	}

	handleRemoveDealButton = () => {
		this.setState({dealDialogOpen:true});
	}
	handleRemoveDealCancel = () => {
		this.setState({dealDialogOpen:false});
	}
	handleRemoveDealConfirm = () => {
		Meteor.call('partnerDeals.remove', this.state.selectedDeal);
		this.setState({dealDialogOpen:false, selectedDeal:'', currentDeal: undefined});
	}

	renderEditDealCard(deal){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveDealCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveDealConfirm}
				/>
		];

		return (<div className='paperMargin'>
			<div className='flexFlow'>
				<div className='flexGrow'>
					<TextField
	    	    		value={deal.name}
	    	    		onChange={this.onEditDealName}
						floatingLabelText='Namn på deal'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={deal.type}
	    	    		onChange={this.onEditDealType}
						floatingLabelText='Typ av deal'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={deal.description}
	    	    		onChange={this.onEditDealDescription}
						floatingLabelText='Beskrivning av deal'
						multiLine={true}
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={deal.price}
	    	    		onChange={this.onEditDealPrice}
						floatingLabelText='kostnad i SEK'
	    	    		/>
				</div>
			</div>
			<div className='flowInverseRow'>	
				<RaisedButton 
		    		onTouchTap={this.handleRemoveDealButton}
		    		label='Ta bort'
					/>
			</div>
			<Dialog
	    		title={'Ta bort entitet : '+deal._id}
	    		modal={true}
	    		open={this.state.dealDialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort denna deal? 
	    	</Dialog>
		</div>);
	}


	onEditExampleName = (event) => {
		let example = this.state.currentExample;
		example.name=event.target.value
		this.setState({currentExample:example});
		Meteor.call('exampleAds.update', example);
	}
	onEditExampleDescription = (event) => {
		let example = this.state.currentExample;
		example.description=event.target.value
		this.setState({currentExample:example});
		Meteor.call('exampleAds.update', example);
	}
	onEditExampleFileLocation = (event) => {
		let example = this.state.currentExample;
		example.fileLocation=event.target.value
		this.setState({currentExample:example});
		Meteor.call('exampleAds.update', example);
	}
	

	handleRemoveExampleButton = () => {
		this.setState({exampleDialogOpen:true});
	}
	handleRemoveExampleCancel = () => {
		this.setState({exampleDialogOpen:false});
	}
	handleRemoveExampleConfirm = () => {
		Meteor.call('exampleAds.remove', this.state.selectedExample);
		this.setState({exampleDialogOpen:false, selectedExample:'', currentExample: undefined});
	}

	renderEditExampleCard(example){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveExampleCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveExampleConfirm}
				/>
		];

		return (<div className='paperMargin'>
			<div className='flexFlow'>
				<div className='flexGrow'>
					<TextField
	    	    		value={example.name}
	    	    		onChange={this.onEditExampleName}
						floatingLabelText='Namn på exempelannons'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={example.description}
	    	    		onChange={this.onEditExampleDescription}
						floatingLabelText='Beskrivning av annons'
						multiLine={true}
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={example.fileLocation?example.fileLocation:''}
	    	    		onChange={this.onEditExampleFileLocation}
						floatingLabelText='bildfil i /public'
	    	    		/>
				</div>
			</div>
			<div className='flowInverseRow'>	
				<RaisedButton 
		    		onTouchTap={this.handleRemoveExampleButton}
		    		label='Ta bort'
					/>
			</div>
			<Dialog
	    		title={'Ta bort entitet : '+example._id}
	    		modal={true}
	    		open={this.state.exampleDialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort denna deal? 
	    	</Dialog>
		</div>);
	}

	
	onEditPreviousName = (event) => {
		let old = this.state.currentPrevious;
		old.name=event.target.value
		this.setState({currentPrevious:old});
		Meteor.call('previousPartners.update', old);
	}
	
	onEditPreviousType = (event) => {
		let old = this.state.currentPrevious;
		old.type=event.target.value
		this.setState({currentPrevious:old});
		Meteor.call('previousPartners.update', old);
	}
	
	onEditPreviousDescription = (event) => {
		let old = this.state.currentPrevious;
		old.description=event.target.value
		this.setState({currentPrevious:old});
		Meteor.call('previousPartners.update', old);
	}
	
	onEditPreviousRedaxNumber = (event) => {
		let old = this.state.currentPrevious;
		old.redaxNumber=event.target.value
		this.setState({currentPrevious:old});
		Meteor.call('previousPartners.update', old);
	}
	
	onEditPreviousFileLocation = (event) => {
		let old = this.state.currentPrevious;
		old.fileLocation=event.target.value
		this.setState({currentPrevious:old});
		Meteor.call('previousPartners.update', old);
	}
	

	handleRemovePreviousButton = () => {
		this.setState({previousDialogOpen:true});
	}
	handleRemovePreviousCancel = () => {
		this.setState({previousDialogOpen:false});
	}
	handleRemovePreviousConfirm = () => {
		Meteor.call('previousPartners.remove', this.state.selectedPrevious);
		this.setState({previousDialogOpen:false, selectedPrevious:'', currentPrevious: undefined});
	}


	renderEditPreviousCard(previous){
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemovePreviousCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemovePreviousConfirm}
				/>
		];

		return (<div className='paperMargin'>
			<div className='flexFlow'>
				<div className='flexGrow'>
					<TextField
	    	    		value={previous.name}
	    	    		onChange={this.onEditPreviousName}
						floatingLabelText='Namn på partner'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={previous.type}
	    	    		onChange={this.onEditPreviousType}
						floatingLabelText='Typ av annons'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={previous.description}
	    	    		onChange={this.onEditPreviousDescription}
						floatingLabelText='Beskrivning av annons'
						multiLine={true}
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={previous.redaxNumber}
	    	    		onChange={this.onEditPreviousRedaxNumber}
						floatingLabelText='Årgång (#152?)'
	    	    		/>
				</div>
				<div className='flexGrow'>
					<TextField
	    	    		value={previous.fileLocation?previous.fileLocation:''}
	    	    		onChange={this.onEditPreviousFileLocation}
						floatingLabelText='bildfil i /public'
	    	    		/>
				</div>
			</div>
			<div className='flowInverseRow'>	
				<RaisedButton 
		    		onTouchTap={this.handleRemovePreviousButton}
		    		label='Ta bort'
					/>
			</div>
			
			<Dialog
	    		title={'Ta bort entitet : '+previous._id}
	    		modal={true}
	    		open={this.state.previousDialogOpen}
	    		contentStyle={modalStyle}
	    		actions={actionButtons}
	    		>
	    		Är du säker på att du vill ta bort denna deal? 
	    	</Dialog>
		</div>);
	}

	render () {
		return (<div>
			<Paper className='paperPadding'>
				Välkommen. Här fixas Annonsinställningar. 
			</Paper>
			<Paper  style={{marginRight:25, marginBottom:25}}>
			<Tabs 
				onChange={this.onTabChange}
				value={this.state.currentTab} 
				>
				<Tab 
					label='Nuvarande deals'
					value='deals'
					>
					<div className='flexBox'>
					<Paper 
						className='overflowY redaxListContainer'
						rounded={false}
					>
						<SelectableList 
				                value = {this.state.selectedDeal}
				                onChange={this.handleDealListSelect}
				              	>
				              	<ListItem 
				                  primaryText="Lägg till" 
				                  value={"new"} 
				                  rightIcon={<AddIcon color={fullWhite}/>}
				                  />
	    	    				<Divider/>
				                {this.props.deals? this.props.deals.map((deal) => {return this.renderListItem(deal);}):''}
				            </SelectableList>
	        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentDeal?this.renderEditDealCard(this.state.currentDeal):''}
	            	</div>
            	</div>
				</Tab>
				<Tab 
					label='Annonsexempel'
					value='examples'
					>
					<div className='flexBox'>
					<Paper 
						className='overflowY redaxListContainer'
						rounded={false}
					>
						<SelectableList 
				                value = {this.state.selectedExample}
				                onChange={this.handleExampleListSelect}
				              	>
				              	<ListItem 
				                  primaryText="Lägg till" 
				                  value={"new"} 
				                  rightIcon={<AddIcon color={fullWhite}/>}
				                  />
	    	    				<Divider/>
				                {this.props.examples? this.props.examples.map((example) => {return this.renderListItem(example);}):''}
				            </SelectableList>
	        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentExample?this.renderEditExampleCard(this.state.currentExample):''}
	            	</div>
            	</div>
				</Tab>
				<Tab 
					label='Tidigare annonser'
					value='previousAds'
					>
					<div className='flexBox'>
					<Paper 
						className='overflowY redaxListContainer'
						rounded={false}
					>
						<SelectableList 
				                value = {this.state.selectedPrevious}
				                onChange={this.handlePreviousListSelect}
				              	>
				              	<ListItem 
				                  primaryText="Lägg till" 
				                  value={"new"} 
				                  rightIcon={<AddIcon color={fullWhite}/>}
				                  />
	    	    				<Divider/>
				                {this.props.previous? this.props.previous.map((prev) => {return this.renderListItem(prev);}):''}
				            </SelectableList>
	        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentPrevious?this.renderEditPreviousCard(this.state.currentPrevious):''}
	            	</div>
            	</div>
				</Tab>

			</Tabs>
			</Paper>
		</div>) 
	};

}

export default createContainer( () => {
	Meteor.subscribe('previousPartners');
	Meteor.subscribe('partnerDeals');
	Meteor.subscribe('exampleAds');
	return {
		previous : PreviousPartners.find({},{sort:{redaxNumber:-1}}).fetch(),
		deals : PDeals.find({},{sort:{price:1}}).fetch(),
		examples : ExampleAds.find({},{sort:{name:1}}).fetch(),
	};
}, EditPartnerDeals);