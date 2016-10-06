import React from 'react';
import {grey1000, grey700, grey400, blueA200, blueA400, blueA100, fullWhite} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'			


modifyMuiTheme = function(){
	let palette = {
	    primary1Color: grey700,
	    primary2Color: grey1000,
	    primary3Color: grey400,
	    accent1Color: blueA200,
	    accent2Color: blueA400,
	    accent3Color: blueA100,
	    textColor: fullWhite,
	    secondaryTextColor: fade(fullWhite, 0.7),
	    disabledTextColor: fade(fullWhite, 0.5),
	    alternateTextColor: fade(fullWhite, 0.5),
	    canvasColor: grey700,
	    borderColor: fade(fullWhite, 0.5),
	    disabledColor: fade(fullWhite, 0.3),
	    pickerHeaderColor: fade(fullWhite, 0.12),
	    clockCircleColor: fade(fullWhite, 0.12),
	};
	let modifications = {
		palette : palette,
		appBar: {
			color:palette.primary2Color,
			textColor:palette.textColor,
		},
		toggle: {
			thumbOnColor:palette.accent2Color,
			thumbOffColor:palette.primary3Color,
			trackOnColor:fade(palette.accent2Color,0.5),
			trackOffColor:fade(palette.primary3Color,0.5),
		},
		textField: {
			floatingLabelText: fade(fullWhite, 0.7),
			focusColor: fade(fullWhite, 0.7),
		},
		slider:{
			selectionColor:palette.accent2Color,
		},
		datePicker: {
			selectColor:palette.primary3Color,
		},
	};
	let theme = getMuiTheme(darkBaseTheme, modifications);
	return theme;
}

const MuiTheme = modifyMuiTheme();



export default MuiTheme;

