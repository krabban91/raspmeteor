import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


export default class HandleUsers extends Component {
	constructor(props) {
	    super(props);
  	}

  	static propTypes = {
  		user: PropTypes.object.isRequired,
  		onRemove : PropTypes.func.isRequired,
  	}
	
  	handleSelectionChange = (event, index, value) =>{
  		Meteor.call('user.updateRole', {userId:this.props.user._id, role:value});
  	}



	render(){
		let {user, onRemove} = this.props;
		let role = user.roles && user.roles.length>0 ? user.roles[0]:''; 
		return (
				<TableRow>
					<TableRowColumn>
						{user.username}
					</TableRowColumn>
					<TableRowColumn>
						<SelectField
							disabled={user._id==Meteor.userId()}
							onChange={this.handleSelectionChange}
							value={role}
							>
							<MenuItem
								key='none'
								value=''
								primaryText='Inga rättigheter'/>
							<MenuItem
								key='seller'
								value='seller'
								primaryText='Försäljare'/>
							<MenuItem
								key='admin'
								value='admin'
								disabled={true}
								primaryText='Administratör'/>
						</SelectField>
					</TableRowColumn>
					<TableRowColumn className='small'>
						<RaisedButton
							label='Ta Bort'
							disabled = {role=='admin'}
							onTouchTap={onRemove.bind(this, user._id)}
							/>
					</TableRowColumn>
				</TableRow>
		);

	}
}

