import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


class ContactSettings extends Component {
	constructor(props){
		super(props);
		this.state = {selectedImage: 0};
	}

	render () {


		return (<div>
			Här fixas raspredax. 
		</div>) 
	};

}

export default createContainer( () => {
	return {
	}
}, ContactSettings);