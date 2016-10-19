const InitPropertiesData = {
	redaxNumber: 152,
	sellingPeriodStart: new Date('2016-10-01'),
	sellingPeriodStop: new Date('2016-05-01'),
	organizationNumber: '802500-2562',
	visitingAddress: {
		name: 'Raspredaktionen',
		street: 'Emil Oförvägen 1A',
		postalInfo: '412 58 Göteborg' 
	},
	invoiceAddress: {
		name: 'Raspredaktionen',
		street: 'Teknologgården 2',
		postalInfo: '412 58 Göteborg' 
	},
	paymentMethods: [
		{
			description: 'Bankgiro', 
			value: '655-0685 (SEB)'
		},
		{
			description: 'Swish', 
			value: '123-658 04 19'
		}
	],
	raspEmail: 'rasp@rasp.chalmers.se',
	raspPhone: '031-18 10 22',
	totalAmountOfRasps: 2500,
}; 

export {InitPropertiesData};