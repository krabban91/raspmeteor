import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';



import {Years} from '/both/collections/years.js'

const SelectableList = MakeSelectable(List); 


class RaspImages extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedImage: '', 
			currentImage: undefined,
		};
	}
	handleListSelect = (event, newMenuitem) => {
		console.log(newMenuitem);
		this.setState({selectedImage: newMenuitem, currentImage: this.props.images.find((image) => {return image._id==newMenuitem;})});

	}

	onEditNumber = (event) => {
		let value = event.target.value.trim();
		if(isNaN(value)) {return;}
		let image = this.state.currentImage;
		image.number= (value.length>0?parseInt(value):'')
		this.setState({currentImage:image});
		if(!isNaN(image.number)){
			Meteor.call('years.updateImage', image);
		}
	}
	onEditYear = (event) => {
		let value = event.target.value.trim();
		let image = this.state.currentImage;
		image.year= value;
		this.setState({currentImage:image});
		if(!isNaN(image.number)){
			Meteor.call('years.updateImage', image);
		}
	}
	onEditFileName = (event) => {
		let value = event.target.value.trim();
		let image = this.state.currentImage;
		image.fileName= value;

		this.setState({currentImage:image});
		if(!isNaN(image.number)){
			Meteor.call('years.updateImage', image);
		}
	}

	renderEditImageInfo(image) {
		return (
			<Paper className='paperPadding'>
        	    holaBonita
        	    <h3>Database entry: {image._id}</h3>
        	    <Divider/>
    	    	<TextField
    	    		value={image.number}
    	    		onChange={this.onEditNumber}
					floatingLabelText='Nummer (#)'
    	    		/>
    	    	<TextField
    	    		value={image.year}
    	    		onChange={this.onEditYear}
					floatingLabelText='Årtal (1864)'
    	    		/>
       	    	<TextField
    	    		value={image.fileName}
    	    		onChange={this.onEditFileName}
					floatingLabelText='Filnamn (152.png)'
    	    		/>
        	</Paper>)
	}

	renderImageListItem(image) {
		return (<ListItem 
			primaryText={image.number.toString()}
			secondaryText={image.year+', '+image.fileName}
			value={image._id}
			key={image._id}
			/>);
	}

	render () {

		// selection list of images
		// edit image-info.
		return (
			<div>
				Välkommen. Här fixas bilderna. 
				<div className='flexBox'>
					<div className='imageListContainer'>
						<SelectableList 
			                value = {this.state.selectedImage}
			                onChange={this.handleListSelect}
			              	>
			              	<ListItem 
			                  primaryText="Lägg till" 
			                  value={"new"} 
			                  />
			                {this.props.images.map((image) => {return this.renderImageListItem(image);})}
			            </SelectableList>
		            </div>
		            <div className='editImageContainer'>
		            	{this.state.currentImage?this.renderEditImageInfo(this.state.currentImage):''}
	            	</div>
				</div>
			</div>) 
	};

}

export default createContainer( () => {
	Meteor.subscribe('years');
	return {
		images : Years.find({}, {sort: {number: 1}}).fetch(),
	}
}, RaspImages);