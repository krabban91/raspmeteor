import React from 'react';

import TopBar from '../partials/TopBar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from '../theme.jsx'

export const MainLayout = ({location, content}) => (
	<MuiThemeProvider muiTheme={MuiTheme}>
		<div className ='main-layout'>
			<TopBar 
				location={location}
			/>
			<main>
				{content}
			</main>
		</div>
	</MuiThemeProvider>
);