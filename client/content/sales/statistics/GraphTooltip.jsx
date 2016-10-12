import React, {PropTypes} from 'react';


const GraphTooltip = React.createClass({
	propTypes:{
		active: PropTypes.bool, 
		payload: PropTypes.array, 
		label: PropTypes.string, 
	}, 
	render(){
		let {active, payload, label} = this.props;
		if(active){
			return (<div className='custom-graph-tooltip'>
				<p className='tooltip-header'> {moment(label, 'YYYY-MM-DD').calendar()}</p>
				<p className='tooltip-today'> Dagen: {payload[0].value}</p>
			</div>);
		}
		return null;
	}
});

export default GraphTooltip;