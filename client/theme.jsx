import React from 'react';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'			


const MuiTheme = getMuiTheme({
  fontFamily: 'Roboto,sans-serif',
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

export default MuiTheme;