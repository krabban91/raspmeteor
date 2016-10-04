import React from 'react';

import SalesTopBar from '../partials/SalesTopBar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from '../theme.jsx'


export const SalesLayout = ({location, content}) => (
	<MuiThemeProvider muiTheme={MuiTheme}>
		<div className ='main-layout'>
			<SalesTopBar 
				location={location}
			/>
		<main>
			{content}
		</main>
		</div>
	</MuiThemeProvider>
);