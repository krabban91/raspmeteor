import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import {Sales} from '/both/collections/sales.js';




export default class ViewSale extends Component {
	
	constructor(props){
		super(props);
		console.log('vafan.?');
	}

	propTypes = {
		document:PropTypes.object.isRequired,
		currentUser:PropTypes.object,
	}

	onRemoveClick = () =>
	{
		
	}
	onRemoveCancel = () =>
	{
		
	}
	onRemoveConfirm = () =>
	{

	}



	render(){	
		return (
			<div className = "salesForm" >
				<Paper className='paperPadding paperMargin'>
				<h2>Försäljning registrerad</h2>
				<Divider/>
				Tack för att du har registrerat din försäljning. 

				Det underlättar arbetet otroligt mycket att inte behöva gissa hur det gick för {this.props.document?(this.props.document.sellers.length==1?'dig':'er'):''}   
				</Paper>
				{this.props.document?<div>
					<div className='flexFlow'>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							<h4>Vem?</h4>
							{this.renderSellers()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							<h4>När? Var?</h4>
							{this.renderDate()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							<h4>Hur mycket?</h4>
							{this.renderSalesStats()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							<h4>Omständigheter?</h4>
							{this.renderCircumstances()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							<h4>Övrigt</h4>
							{this.renderRemainders()}
						</Paper>
					</div>
					xzzs
					<RaisedButton
						label="Ta bort"
						style={{float:'right', margin:30}}
						/>
				</div>:''}
			</div>);
	}

	renderSellers(){
		let sellers = this.props.document.sellers;
		return (<div>
			<h3>De som sålde var</h3>
			{sellers.map((seller) => {
				return (<div>
						{sellers}
					</div>);
			})}
		</div>);
	}

	renderDate() {
		let sale = this.props.document;
		return (<div>
			<h3>Tid och plats</h3>
			<table><tbody>
			<tr><td>
			Datum
			</td> <td>{moment(sale.sellingDate).calendar()}</td>
			</tr>
			<tr><td>
			Försäljningstid 
			</td> <td>{sale.totalSellingTime}</td>
			</tr>
			<tr><td>
			Plats 
			</td> <td>{sale.sellingLocation}</td>
			</tr>
			</tbody></table>

		</div>);
	}

	renderSalesStats(){
		let sale = this.props.document;
		return (<div>
			<h3>Försäljning</h3>
			<table><tbody>
			<tr><td>
			Strån/person 
			</td> <td>{sale.noOfStraws}</td>
			</tr>
			<tr><td>
			Sålda Raspar
			</td> <td>{sale.soldRasps}</td>
			</tr>
			<tr><td>
			Betalingar (Swish vs iZettle) 
			</td> <td>{sale.swishPayments} vs {sale.iZettlePayments}</td>
			</tr>
			</tbody></table>
		</div>);
	}


	renderCircumstances(){
		let sale = this.props.document;
		return (<div>
			<h3>Omständigheter</h3>
			<table><tbody>
			<tr><td>
			Vädret
			</td> <td>{sale.weather}</td>
			</tr>
			<tr><td>
			Antal förbipasserande
			</td> <td>{sale.crowdness}</td>
			</tr>
			<tr><td>
			Rolighetsnivå
			</td> <td>{sale.funLevel}</td>
			</tr>
			</tbody></table>
		</div>);
	}

	renderRemainders(){
		let sale = this.props.document;
		return (<div>
			<h3>Övriga Kommentarer</h3>
			{sale.comments}
		</div>);
	}
}

