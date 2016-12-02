import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn} from 'material-ui/Table';

import PotentialClientRow from './PotentialClientRow.jsx'
import {Subscribers} from '/both/collections/subscribers.js';

class InterestedSubscribersView extends Component {

	renderClientsTable(clients, title){
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
								<TableHeaderColumn>Kontaktperson</TableHeaderColumn>
								<TableHeaderColumn>Epost</TableHeaderColumn>
								<TableHeaderColumn className='small'>Kontaktad</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody
							showRowHover={true}
						>
							{clients.map((client) => {
								return (
									<PotentialClientRow
									  key={client._id}
									  client={client}
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
					<h2>Intresserade tidningsköpare</h2>
	        	    <Divider/>
					Här finner du de privatpersoner som kontaktat Raspredax för att få tag i en tidning.
	        	</Paper>
	        	<div className='flexFlow vertical'>
				{this.props.potentialClients && this.props.potentialClients.length>0?
					this.renderClientsTable(this.props.potentialClients, "Intressenter ("+this.props.potentialClients.length + "st)"):''}
		        </div>
			</div>
		);
	}
}

export default createContainer(()=> {
	Meteor.subscribe('subscribers');
	return {
		potentialClients : Subscribers.find({},{sort:{createdAt:-1}}).fetch(),
	};
}, InterestedSubscribersView);