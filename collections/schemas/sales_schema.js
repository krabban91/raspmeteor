
const Schema = {
  sellers: {
    type: [{
      name:String,
    }],
  },
  soldRasps: {
    type: Number, 
    min: 0,
    optional: false,
  },
  noOfStraws: {
    type: Number, 
    min: 0,
    max: 4, 
    optional: false,
    decimal:true,
  },
  swishPayments: {
    type: Number, 
    min: 0,
    optional: false,
  },
  iZettlePayments: {
    type: Number, 
    min: 0, 
    optional: false,
  },
  sellingDate: {
    type : Date,
    optional: false,
  },
  sellingLocation: {
    type: String,
    optional: false,
  },
  totalSellingTime: {
    type: String,
    optional : false,
  },
  weather: {
    type: String,
    optional : false,
    allowedValues: [
      'Sol',
      "Uppehåll",
      "Regn",
      "Blåsigt",
      "Snö",
      "Hagel",
      "Slask",
    ],
  },
   crowdness: {
    type: String,
    optional : false,
    allowedValues: [
      "Massor",
      "Ganska många",
      "Alldeles lagom",
      "Några",
      "Inte en jävel",
    ],
  },
  tactic: {
    type: String,
    optional : false,
    allowedValues: [
      "Övertalning",
      "Glad och trevlig",
      "Missionerande",
      "Ingen särskild",
    ],
  },
  funLevel: {
    type: String,
    optional : false,
    allowedValues: [
      "Jävelroligt",
      "Kul. Punkt.",
      "meh.",
      "Jag ville dö",
    ],
  },
  comments: {
    type: String,
    optional: true,
  },
  createdAt : { 
    type: Date,
    optional: false,
  },
  owner: {
    type: String, 
    optional: false,
  },
  verified: {
    type: Boolean, 
    optional: true,
  }
};

export default Schema;