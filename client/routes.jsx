import React from 'react';
import {mount} from 'react-mounter';
import {Session} from 'meteor/session';



import Home from './content/home/Home.jsx';
import History from './content/history/History.jsx';
import Previous from './content/previous_releases/Previous.jsx';
import Subscribe from './content/subscribe/Subscribe.jsx';
import Partners from './content/partners/Partners.jsx';
import Contact from './content/contact/Contact.jsx';

import App from './content/sales/App.jsx';
import SalesHome from './content/sales/SalesHome.jsx';
import SalesOverview from './content/sales/SalesOverview.jsx';
import SalesForm from './content/sales/SalesForm.jsx';
import LoginForm from './content/sales/LoginForm.jsx';
import RegisterUserForm from './content/sales/accounts/RegisterUserForm.jsx';
import HandleUsers from './content/sales/accounts/HandleUsers.jsx';

import {MainLayout} from './layouts/MainLayout.jsx';
import {SalesLayout} from './layouts/SalesLayout.jsx';





FlowRouter.route('/', {
	action() {
		mount(MainLayout, {
			location: ("/"),
			content : (<Home />),
		});
	}
});

FlowRouter.route('/history', {
	action() {
		mount(MainLayout, {
			location: "/history",
			content : (<History />),
		});

	}
});

FlowRouter.route('/previous', {
	action() {
		mount(MainLayout, {
			location: "/previous",
			content : (<Previous />),
		});

	}
});
FlowRouter.route('/buy', {
	action() {
		mount(MainLayout, {
			location: "/buy",
			content : (<Subscribe />),
		});

	}
});
FlowRouter.route('/partners', {
	action() {
		mount(MainLayout, {
			location: "/partners",
			content : (<Partners />),
		});

	}
});
FlowRouter.route('/contact', {
	action() {
		mount(MainLayout, {
			location: "/contact",
			content : (<Contact />),
		});

	}
});


FlowRouter.route('/sales', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		} 
		mount(SalesLayout, {
			location: "/sales",
			content : (<SalesHome />),
		});
	}
});
FlowRouter.route('/sales/new', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin','seller'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/new",
			content : (<SalesForm />),
		});
	}
});

FlowRouter.route('/sales/summary', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		} 
		if(!Roles.userIsInRole(user, ['admin','seller'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/summary",
			content : (<SalesOverview />),
		});
	}
});


FlowRouter.route('/sales/login', {
	action() {
		if (Meteor.user()){
			FlowRouter.go('/sales');
		} 
		mount(MainLayout, {
			location: "/sales/login",
			content : (<LoginForm />),
		});
	}
});

FlowRouter.route('/sales/register', {
	action() {

		mount(MainLayout, {
			location: "/sales/register",
			content : (<RegisterUserForm />),
		});
	}
});

FlowRouter.route('/sales/handleusers', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/handleusers",
			content : (<HandleUsers 
						/>),
		});
	}
});
