import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import {Redax} from '/both/collections/redax.js';
import {Properties} from '/both/collections/properties.js';



class Contact extends Component {

	renderMemberCard(member) {
		const styles= {
			header:{
				padding:10,
			}
		}
		return (
			<Card key={member._id} className='redaxCard'>
				<CardHeader className='redaxCardHeader'
					title={member.title}
					subtitle={member.name}
					actAsExpander={true}
					showExpandableButton={true}
					style={styles.header}
					/>
				<CardText
					expandable={true}
					>
					<Divider/>
					<table>
					<tbody>
						{member.phoneNumber?(<tr><td>Telefon: </td><td>{member.phoneNumber}</td></tr>):(<tr></tr>)}
						{member.emailAddress && member.emailAddress.trim().length>0?(<tr><td>Email: </td><td>{member.emailAddress}</td></tr>):(<tr></tr>)}
					</tbody>
					</table>
				</CardText>
			</Card>);
	}

	renderVisitingAddress() {
		let address = this.props.properties.visitingAddress; 
		return (
			<Paper zDepth={2} className='paperPadding paperMargin flexGrow'>
				<h2>Besöksaddress</h2>
				{address.name}<br/>
				{address.street}<br/>
				{address.postalInfo}
			</Paper>);
	}

	renderPostalAddress() {
		let address = this.props.properties.invoiceAddress; 
		return (
			<Paper zDepth={2} className='paperPadding paperMargin flexGrow'>
				<h2>Postaddress</h2>
				{address.name}<br/>
				{address.street}<br/>
				{address.postalInfo}
			</Paper>);
	}

	renderContactInfo() {
		let email = this.props.properties.raspEmail; 
		let phone = this.props.properties.raspPhone; 
		return (
			<Paper zDepth={2} className='paperPadding paperMargin flexGrow'>
				<h2>Kontaktas via</h2>
				{email?email:''}<br/>
				{phone?phone:''}
			</Paper>);
	}

	renderPaymentMethods() {
		let methods = this.props.properties.paymentMethods;
		return (
			<Paper zDepth={2} className='paperPadding paperMargin flexGrow'>
				<h2>Betalningsmetoder</h2>
				{methods.map((method)=> {return (<div key={method.description}>{method.description}: {method.value}</div>)})}
			</Paper>);
	}

	render() {
	    return (
			<div className="container">
				<Paper className='paperPadding'>
				<h1>Raspredaktionen</h1>
				{this.props.properties?(
					<div className='flexFlow'>
						{this.props.properties.visitingAddress?this.renderVisitingAddress():''}
						{this.props.properties.invoiceAddress?this.renderPostalAddress():''}
						{this.props.properties.raspEmail || this.props.properties.raspPhone?this.renderContactInfo():''}
						{this.props.properties.paymentMethods?this.renderPaymentMethods():''}
						
						<Paper zDepth={2} className='paperPadding paperMargin flexGrow'>
							<h2>Betaltjänster</h2>
							PlusGiro: 46631-8<br/>
							Swish: 123-658 04 19
						</Paper>
						</div>):''}
				</Paper>
				<Paper className='paperPadding'>
					<h2>Raspredaktionen #{this.props.properties? this.props.properties.redaxNumber:''}</h2>
					<Divider/>
					Består av följade medlemmar
					<div className='flexCentering'>
					{this.props.redax.map((member) => {return this.renderMemberCard(member);})}
					</div>
				</Paper>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('redax');
	Meteor.subscribe('properties');
	return {
		redax : Redax.find({}, {sort: {roleNumber: 1}}).fetch(),
		properties : Properties.find().fetch()[0],
	}
}, Contact)