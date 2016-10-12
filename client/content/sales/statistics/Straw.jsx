import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import {TableRow, TableRowColumn} from 'material-ui/Table';


export default class Straw extends Component {

	
	render(){
		return (
			<TableRow>
				<TableRowColumn>
					{this.props.straw._id}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.straw.count}	
				</TableRowColumn>
			</TableRow>
		);
	}
}


Straw.PropTypes = {
	straw : PropTypes.object.isRequired,
};