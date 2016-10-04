import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class History extends Component {
	render() {
	    return (
			<div className="container">	
				<h1>Historia</h1>
				<h3>Chalmeristisk humortidning</h3>
				RASP är en studentikos tidning bestående av skämtsamma texter och bilder. Tidningen ges ut under devisen "tidning för allvar och städat skämt" vilket sedan starten stått för en tidning som är både rolig och stilfull. Ett särdrag hos tidningen är dess vana att skifta form och tema mellan utgåvorna. Varje år tar sig tidningen en ny skepnad och denna förblir en väl bevarad hemlighet ända fram tills den släpps.
				<h3>Rolig sedan 1872</h3>
				RASP är en tidning som roat sina läsare i över hundra år. Tidningens föregångare "Framåt" grundades 1867 men lades ner bara några år senare. År 1872 gavs den första egentliga RASPen ut. Man brukar av historiska skäl räkna årgångarna från 1864 vilket betyder att årets RASP har nummer 152. Tidningen skrivs av chalmerister men flera gästande tecknare och skribenter har medverkat genom åren. Av de mest kända kan nämnas Axel Engdahl och konstnären Carl Larsson.
				<h3>Släpps i november</h3>
				RASP ges ut en gång om året. Den släpps i november under högtidliga former och är alltid lika uppskattad bland chalmerister och göteborgare. Så håll utkik efter årets RASP! 
			</div>
		);
	}
}
