import React from 'react';


import TopBar from '../partials/TopBar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from '../theme.jsx'

export const MainLayout = ({location, content, currentUser}) => (
	<MuiThemeProvider muiTheme={MuiTheme}>
		<div>
			<TopBar 
				location={location}
				currentUser={currentUser}
			/>
			<main>
				{content}
			</main>
		</div>
	</MuiThemeProvider>
);