import { Meteor } from 'meteor/meteor';
import React, {PropTypes, Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';


import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AddIcon from 'react-material-icons/icons/content/add';

import {fullWhite} from 'material-ui/styles/colors';


import {Years} from '/both/collections/years.js'

const SelectableList = MakeSelectable(List); 


class RaspImages extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedImage: '', 
			currentImage: undefined,
			dialogOpen:false,
		};
	}

	handleListSelect = (event, newMenuitem) => {
		if(newMenuitem=='new'){
			Meteor.call('years.add', (err, yearId) => {
				if(err){
					console.log(err);
					return;
				}
				this.setState({selectedImage: yearId, currentImage: this.props.images.find((image) => {return image._id==yearId;})});
			});
		} 
		else {
			this.setState({selectedImage: newMenuitem, currentImage: this.props.images.find((image) => {return image._id==newMenuitem;})});
		}
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
	onEditSmallFileName = (event) => {
		let value = event.target.value.trim();
		let image = this.state.currentImage;
		image.smallFileName= value;

		this.setState({currentImage:image});
		if(!isNaN(image.number)){
			Meteor.call('years.updateImage', image);
		}
	}

	handleRemoveButton = (event) => {
		this.setState({dialogOpen:true});
	}
	handleRemoveCancel = (event) => {
		this.setState({dialogOpen:false});
	}
	handleRemoveConfirm = (event) => {
		Meteor.call('years.remove', this.state.selectedImage);
		this.setState({dialogOpen:false, selectedImage:'', currentImage: undefined});
	}

	renderEditImageInfo(image) {
		const modalStyle =  {
			width:'100%', 
			maxWidth:'none',
		};
		const actionButtons = [
			<FlatButton
				label="Avbryt"
				onTouchTap={this.handleRemoveCancel}
				/>,
			<FlatButton
				label="Fortsätt"
				onTouchTap={this.handleRemoveConfirm}
				/>

		];
		return (
			<Paper className='paperPadding'>
        	    <h3>Database entry: {image._id}</h3>
        	    <Divider/>
    	    	<div className='flexFlow'>
	    	    	<div className='flexGrow'>
	    	    	<TextField
	    	    		value={image.number}
	    	    		onChange={this.onEditNumber}
						floatingLabelText='Nummer (#)'
	    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
	    	    	<TextField
	    	    		value={image.year}
	    	    		onChange={this.onEditYear}
						floatingLabelText='Årtal (1864)'
	    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
	       	    	<TextField
	    	    		value={image.fileName}
	    	    		onChange={this.onEditFileName}
						floatingLabelText='Filnamn (Medel upplösning)'
	    	    		/>
	    	    	</div>
	    	    	<div className='flexGrow'>
	       	    	<TextField
	    	    		value={image.smallFileName}
	    	    		onChange={this.onEditSmallFileName}
						floatingLabelText='Filnamn (Låg upplösning)'
	    	    		/>
	    	    	</div>
    	      	</div>
				<div className='flowInverseRow'>
    		    	<RaisedButton
	    	    		onTouchTap={this.handleRemoveButton}
	    	    		label='Ta bort'/>
	    		</div>
    	    	<Dialog
    	    		title={'Ta bort entitet : '+image._id}
    	    		modal={true}
    	    		open={this.state.dialogOpen}
    	    		contentStyle={modalStyle}
    	    		actions={actionButtons}
    	    		>
    	    		Är du säker på att du vill ta bort detta årtalet? 
    	    	</Dialog>
        	</Paper>)
	}

	renderImageListItem(image) {
		return (<ListItem 
			primaryText={image.number.toString()}
			secondaryText={image.year+', '+image.fileName}
			leftAvatar={<Avatar src={image.smallFileName}/>}
			value={image._id}
			key={image._id}
			/>);
	}

	render () {

		// selection list of images
		// edit image-info.
		return (
			<div>
				<Paper className='paperPadding'>
					<h2>Inställningar: Tidigare raspar</h2>
	        	    <Divider/>
					Här justeras inställningarna kring vilka raspar som visas på hemsidan. 
					Namnet som ställs in här förväntas att hittas under /public-mappen på SFTP:n.
	        	</Paper>

				<div className='flexBox'>
					<Paper className='overflowY imageListContainer paperPadding'>
						<SelectableList 
			                value = {this.state.selectedImage}
			                onChange={this.handleListSelect}
			              	>
			              	<ListItem 
			                  primaryText="Lägg till" 
			                  value={"new"} 
			                  rightIcon={<AddIcon color={fullWhite}/>}
			                  />
    	    				<Divider/>
			                {this.props.images.map((image) => {return this.renderImageListItem(image);})}
			            </SelectableList>
        			</Paper>
		            <div className='editImageContainer'>
		            	{this.state.currentImage?this.renderEditImageInfo(this.state.currentImage):''}
	            	</div>
				</div>
			</div>) 
	}

}

RaspImages.PropTypes = {
	images: PropTypes.array.isRequired,
}

export default createContainer( () => {
	Meteor.subscribe('years');
	return {
		images : Years.find({}, {sort: {number: -1}}).fetch(),
	}
}, RaspImages);