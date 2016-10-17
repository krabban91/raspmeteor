import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


class PartnerDeals extends Component {
	constructor(props){
		super(props);
	}

	render () {
		return (<div>
			Välkommen. Här fixas Annonspriser. 
		</div>) 
	};

}

export default createContainer( () => {
	return {
	}
}, PartnerDeals);