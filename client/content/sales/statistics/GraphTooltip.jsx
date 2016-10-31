import React, {PropTypes} from 'react';


const GraphTooltip = React.createClass({
	propTypes:{
		active: PropTypes.bool, 
		payload: PropTypes.array, 
		label: PropTypes.string, 
	}, 
	render(){
		const config = {
		    sameDay: '[Idag]',
		    nextDay: '[Imorgon]',
		    nextWeek: 'dddd',
		    lastDay: '[Igår]',
		    lastWeek: '[Förra] dddd',
		    sameElse: 'YYYY-MM-DD'
		}; 
		let {active, payload, label} = this.props;
		if(active){
			return (<div className='custom-graph-tooltip'>
				<p className='tooltip-header'> {moment(label, 'YYYY-MM-DD').calendar(null, config)}</p>
				<p className='tooltip-today'> Dagen: {payload[0].value}</p>
			</div>);
		}
		return null;
	}
});

export default GraphTooltip;