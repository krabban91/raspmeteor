import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class Partners extends Component {
	render() {
	    return (
			<div className="container">
				<h3>Partners. Hurra!</h3>

				<h1>Annonsera i Rasp</h1>
				<div>
					Vill Ni som företag komma ut med Ert varumärke bland tusentals Chalmerister och andra Göteborgare? Då finns möjligheten att annonsera i studentpublikationen Rasp! Vi har en trogen skara som läser tidningen varje år, däribland Kungen av Sverige.
				</div>
				<div>
					Bland våra tidigare samarbetspartners kan nämnas:
					CING, Jobtop, Rock &amp; Werner, Bergstrands Kafferosteri, Nordstan,  Bengt Frithiofsson med flera. 
				</div>
				<div>
					Intresserad?
					Sugen på mer info och prisuppgifter?
					Bara pratglad?
					Tag då kontakt med Redax redan idag!
	                Du når oss enkelt <a href="/contact">här</a>.
				</div>
				<div>
					Annonsexempel från äldre upplagor: 
				</div>
				<div>
					Fastighetsbolag.
				</div>
				<div>
					Arkitektbyrå.
				</div>
				<div>
					Tekniskt konsultföretag.
				</div>
				<div>
					Leverantör av helhetssystem inom IT.
				</div>
			</div>
		);
	}
}
