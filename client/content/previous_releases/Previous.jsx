import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoominIcon from 'react-material-icons/icons/action/zoom-in';


import {Years} from '/both/collections/years.js'

const SelectableList = MakeSelectable(List); 


class Previous extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedImage:'',
			currentImage:undefined,
		};
	}

	handleListSelect = (event, newMenuitem) => {
		this.setState({selectedImage: newMenuitem, currentImage: this.props.images.find((image) => {return image._id==newMenuitem;})});
	}

	renderImageListItem(image) {
		return (<ListItem 
			primaryText={image.number.toString()}
			secondaryText={image.year}
			leftAvatar={<Avatar src={image.smallFileName}/>}
			value={image._id}
			key={image._id}
			/>);
	}

	renderViewImageCard(image) {
		return (
			<Paper className='viewOldRaspCard'  rounded={false}>
				<h2>#{image.number}</h2>
				{image.year}
				<Divider/>
				<div className='previousImageContainer'>
					<img src={image.fileName}  />
				</div>
			</Paper>);
	}
//style={{maxWidth:'auto', width:'auto', minWidth:'auto', }};

	render() {
	    return (
			<div className="container">
	        	
				<Paper className='paperPadding' rounded={false}>
					<h2>Tidigare raspar</h2>
	        	    <Divider/>
					Här finner du omslag från tidigare års Raspar.
	        	</Paper>
	        	<div className='flexBox'>
					<Paper 
						className='overflowY imageListPreviousContainer paperPadding'
						rounded={false}
					>
						<SelectableList 
				                value = {this.state.selectedImage}
				                onChange={this.handleListSelect}
				              	>
				                {this.props.images.map((image) => {return this.renderImageListItem(image);})}
				            </SelectableList>
	        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentImage?this.renderViewImageCard(this.state.currentImage):''}
	            	</div>
            	</div>
			</div>
		);
	}
}

Previous.PropTypes = {
	images: PropTypes.array.isRequired,
}

export default createContainer( () =>{
	Meteor.subscribe('years');
	return {
		images : Years.find({}, {sort: {number: -1}}).fetch(),
	}

}, Previous);