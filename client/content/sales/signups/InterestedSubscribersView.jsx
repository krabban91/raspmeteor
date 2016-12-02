
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn} from 'material-ui/Table';

import PotentialPartnersRow from './PotentialPartnersRow.jsx'
import {PotentialPartners} from '/both/collections/potentialPartners.js';

class InterestedSubscribersView extends Component {

	renderClientsTable(partners, title){
		return (
			<Paper className='paperPadding'>
				<h3>{title}</h3>
					<div className='fixedHeight overflowY'>
					<Table>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}>

							<TableRow>
								<TableHeaderColumn>Datum</TableHeaderColumn>
								<TableHeaderColumn>Företag</TableHeaderColumn>
								<TableHeaderColumn>Kontaktperson</TableHeaderColumn>
								<TableHeaderColumn>Epost</TableHeaderColumn>
								<TableHeaderColumn>Telefon</TableHeaderColumn>
								<TableHeaderColumn>Meddelande</TableHeaderColumn>
								<TableHeaderColumn className='small'>Kontaktad</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody
							showRowHover={true}
						>
							{partners.map((partner) => {
								return (
									<PotentialPartnersRow
									  key={partner._id}
									  partner={partner}
									/>
								);
							})}
						</TableBody>
					</Table>
					</div>
			</Paper>);
	}

	render() {
	    return (
			<div className="container">
				<Paper className='paperPadding' rounded={false}>
					<h2>Intresserade annonsörer</h2>
	        	    <Divider/>
					Här finner du de företag som kontaktat Raspredax för att få delta i partnerskap.
	        	</Paper>
	        	<div className='flexFlow vertical'>
				{this.props.potentialPartners && this.props.potentialPartners.length>0?
					this.renderClientsTable(this.props.potentialPartners, "Intressenter ("+this.props.potentialPartners.length + "st)"):''}
		        </div>
			</div>
		);
	}
}

export default createContainer(()=> {
	//Meteor.subscribe('potentialPartners');
	return {
		potentialPartners : PotentialPartners.find({},{sort:{createdAt:-1}}).fetch(),
	};
}, InterestedSubscribersView);