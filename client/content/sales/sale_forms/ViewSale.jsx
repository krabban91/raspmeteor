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
		Meteor.call('sales.remove',this.props.document._id);
		this.setState({dialogOpen:false});
		FlowRouter.go('/sales');

	}



	render(){	
		return (
			<div className = "salesForm" >
				<Paper className='paperPadding paperMargin'>
				<h2>Försäljning registrerad</h2>
				<Divider/>
				<div>
				Tack för att du har registrerat din försäljning. 
				</div>
				<div>
					Det underlättar arbetet otroligt mycket att inte behöva gissa hur det gick för {this.props.document?(this.props.document.sellers.length==1?'dig':'er'):''}   
				</div>
				<div>
					Om någonting ser fel ut så är det lättast att ta bort den här rapporten och skapa en ny. 
				</div>

				</Paper>
				{this.props.document?<div>
					<div className=''>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							{this.renderSellers()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							{this.renderDate()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							{this.renderSalesStats()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							{this.renderCircumstances()}
						</Paper>
						<Paper className='paperPadding paperMargin flexGrow' rounded={false}>
							{this.renderRemainders()}
						</Paper>
					</div>
					{this.renderRemoveDialog()}
					
				</div>:''}
			</div>);
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
			    		title={'Ta bort rapporten : '+this.props.document._id}
			    		modal={true}
			    		open={this.state.dialogOpen}
			    		contentStyle={modalStyle}
			    		actions={actionButtons}
			    		>
			    		Är du säker på att du vill ta bort den här rapporten? 
	    			</Dialog>
		</div>
	}

	renderSellers(){
		let sellers = this.props.document.sellers;
		return (<div>
			<h3>De som sålde var:</h3>
			{sellers.map((seller) => {
				return (<div key={seller}>
						{seller}
					</div>);
			})}
		</div>);
	}

	renderDate() {
		let sale = this.props.document;
		return (<div>
			<h3>Tid och plats</h3>
			<table><tbody><tr><td>
			Datum
			</td><td style={{paddingLeft:5}}>{moment(sale.sellingDate).calendar()}</td>
			</tr><tr><td>
			Försäljningstid 
			</td><td style={{paddingLeft:5}}>{sale.totalSellingTime}</td>
			</tr><tr><td>
			Plats 
			</td><td style={{paddingLeft:5}}>{sale.sellingLocation}</td>
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
			</td><td style={{paddingLeft:5}}>{sale.noOfStraws}</td>
			</tr>
			<tr><td>
			Sålda Raspar
			</td><td style={{paddingLeft:5}}>{sale.soldRasps}</td>
			</tr>
			<tr><td>
			Betalingar (Swish vs iZettle) 
			</td><td style={{paddingLeft:5}}>{sale.swishPayments} vs {sale.iZettlePayments}</td>
			</tr>
			</tbody></table>
		</div>);
	}


	renderCircumstances(){
		let sale = this.props.document;
		return (<div>
			<h3>Omständigheter</h3>
			<table><tbody>
			<tr ><td>
			Vädret
			</td><td style={{paddingLeft:5}}>{sale.weather}</td>
			</tr>
			<tr><td>
			Antal förbipasserande
			</td><td style={{paddingLeft:5}}>{sale.crowdness}</td>
			</tr>
			<tr><td>
			Rolighetsnivå
			</td><td style={{paddingLeft:5}}>{sale.funLevel}</td>
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

