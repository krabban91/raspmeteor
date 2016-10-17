import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


class Properties extends Component {
	constructor(props){
		super(props);
		this.state = {selectedImage: 0};
	}

	render () {


		// nummer, försäljningsstart, -stopp
		// edit image-info.
		return (<div>
			Välkommen. Här fixas inställningarna. 
		</div>) 
	};

}

export default createContainer( () => {
	return {
	}
}, Properties);