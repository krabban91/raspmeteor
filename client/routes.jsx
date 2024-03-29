import React from 'react';
import {mount} from 'react-mounter';
import {Session} from 'meteor/session';

import {Sales} from '/both/collections/sales.js';
import {PotentialPartners} from '/both/collections/potentialPartners.js';
import {Subscribers} from '/both/collections/subscribers.js';

import Containers, {DocumentContainer} from 'meteor/utilities:react-list-container';

import Home from './content/home/Home.jsx';
import History from './content/history/History.jsx';
import Previous from './content/previous_releases/Previous.jsx';
import Subscribe from './content/subscribe/Subscribe.jsx';
import Partners from './content/partners/Partners.jsx';
import Contact from './content/contact/Contact.jsx';

import SalesHome from './content/sales/SalesHome.jsx';
import SalesOverview from './content/sales/statistics/SalesOverview.jsx';
import SalesForm from './content/sales/sale_forms/SalesForm.jsx';
import EditSalesForm from './content/sales/sale_forms/EditSalesForm.jsx';
import ViewSale from './content/sales/sale_forms/ViewSale.jsx';
import LoginForm from './content/sales/accounts/LoginForm.jsx';
import RegisterUserForm from './content/sales/accounts/RegisterUserForm.jsx';
import HandleUsers from './content/sales/accounts/HandleUsers.jsx';

import InterestedPartnersView from './content/sales/signups/InterestedPartnersView.jsx';
import InterestedSubscribersView from './content/sales/signups/InterestedSubscribersView.jsx';
import InterestedPartnerSingle from './content/sales/signups/InterestedPartnerSingle.jsx';
import InterestedClientSingle from './content/sales/signups/InterestedClientSingle.jsx';


import ContactSettings from './content/sales/main_page_properties/ContactSettings.jsx';
import EditPartnerDeals from './content/sales/main_page_properties/EditPartnerDeals.jsx';
import EditProperties from './content/sales/main_page_properties/EditProperties.jsx';
import RaspImages from './content/sales/main_page_properties/RaspImages.jsx';

import EditSaleSettings from './content/sales/sales_properties/EditSaleSettings.jsx';

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

FlowRouter.route('/sales/view/:saleId', {
	action(params, queryParams) {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin','seller'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location : 	'/sales/view/'+params.saleId,
			content: 	(<DocumentContainer
							collection={Sales}
							publication='sales'
							selector={{_id:params.saleId}}
							terms={{_id:params.saleId}}
							>
							<ViewSale/>
						</DocumentContainer>),
		});
		console.log('view sale with id: '+params.saleId);
	}
});

FlowRouter.route('/sales/edit/:saleId', {
	action(params, queryParams) {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location : 	'/sales/edit/'+params.saleId,
			content: 	(<DocumentContainer
							collection={Sales}
							publication='sales'
							selector={{_id:params.saleId}}
							terms={{_id:params.saleId}}
							>
							<EditSalesForm/>
						</DocumentContainer>),
		});
		console.log('edit sale with id: '+params.saleId);
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

//Signups

FlowRouter.route('/sales/signups/partners', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		} 
		mount(SalesLayout, {
			location: "/sales/signups/partners",
			content : (<InterestedPartnersView />),
		});
	}
});

FlowRouter.route('/sales/signups/partners/view/:partnerId', {
	action(params, queryParams) {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin','seller'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/signups/partners/view/"+params.partnerId,
			content: (<DocumentContainer
						collection={PotentialPartners}
						publication='potentials'
						selector={{_id:params.partnerId}}
						terms={{_id:params.partnerId}}
						>
						<InterestedPartnerSingle/>
					</DocumentContainer>)
		});
		console.log('view partner with id: '+params.partnerId);

	}
});


FlowRouter.route('/sales/signups/clients', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		} 
		mount(SalesLayout, {
			location: "/sales/signups/clients",
			content : (<InterestedSubscribersView />),
		});

	}
});


FlowRouter.route('/sales/signups/clients/view/:clientId', {
	action(params, queryParams) {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin','seller'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/signups/clients/view/"+params.clientId,
			content: (<DocumentContainer
						collection={Subscribers}
						publication='subscribers'
						selector={{_id:params.clientId}}
						terms={{_id:params.clientId}}
						>
						<InterestedClientSingle/>
					</DocumentContainer>)
		});
		console.log('view client with id: '+params.clientId);

	}
});

//Settings main page

FlowRouter.route('/sales/settings/information', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/settings/information",
			content : (<EditProperties 
						/>),
		});
	}
});

FlowRouter.route('/sales/settings/redax', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/settings/redax",
			content : (<ContactSettings 
						/>),
		});
	}
});

FlowRouter.route('/sales/settings/images', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/settings/images",
			content : (<RaspImages 
						/>),
		});
	}
});

FlowRouter.route('/sales/settings/partners', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/settings/partners",
			content : (<EditPartnerDeals 
						/>),
		});
	}
});
FlowRouter.route('/sales/settings/sale', {
	action() {
		let user = Meteor.user();
		if (!user){
			FlowRouter.go('/sales/login');
		}
		if(!Roles.userIsInRole(user, ['admin'])){
			FlowRouter.go('/sales');
		}
		mount(SalesLayout, {
			location: "/sales/settings/sale",
			content : (<EditSaleSettings 
						/>),
		});
	}
});



FlowRouter.notFound = {
	action : () => {
		FlowRouter.go('/');
	}
};