import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem,MakeSelectable} from 'material-ui/List';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import AddIcon from 'react-material-icons/icons/content/add';

import {fullWhite} from 'material-ui/styles/colors';


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
			selectedExample:'',
			currentExample:undefined, 
			selectedPrevious:'',
			currentPrevious:undefined,
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
		this.setState({currentTab:value});
	}

	renderListItem(item, secondText){
		return <ListItem 
			primaryText={item.name}
			value={item._id}
			key={item._id}
			/>;
	}

	renderEditDealCard(deal){
		return (<div>edit {deal.name}</div>);
	}

	renderEditExampleCard(example){
		return (<div>edit {example.name}</div>);
	}

	renderEditPreviousCard(previous){
		return (<div>edit {previous.name}</div>);
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
				                {this.props.deals.map((deal) => {return this.renderDealsListItem(deal);})}
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
				</Tab>
				<Tab 
					label='Tidigare annonser'
					value='previousAds'
					>
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