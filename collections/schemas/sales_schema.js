

const Schema = {
  Sellers: {
    type: [String],
    materialForm: {
      floatingLabelText: 'Försäljare',
      hintText: 'Grisen',
    }
  },
  SoldRasps: {
    type: Number, 
    min: 0,
    optional: false,
    materialForm: {
      floatingLabelText: 'Antal raspar sålda',
      hintText: '42',
    },  
  },
  NoOfStraws: {
    type: Number, 
    min: 0,
    optional: false,
    materialForm: {
      step: 0.5,
      floatingLabelText: 'Antal strån för passet (per person)',
      hintText: '0.5',
    },    
  },
  SwishPayments: {
    type: Number, 
    min: 0,
    optional: false,
    materialForm: {
      floatingLabelText: 'Antal Swish-betalningar',
      hintText: '1',
    }, 
  },
  IZettlePayments: {
    type: Number, 
    min: 0, 
    optional: false,
    materialForm: {
      floatingLabelText: 'Antal iZettle-betalningar',
      hintText: '1',
    },  
  },
  SellingDate: {
    type : Date,
    label : "Försäljningsdatum",
    defaultValue: new Date(),
    materialForm: {
      floatingLabelText: "Försäljningsdatum",
      container: 'inline',
      autoOk: true,
    },
  },
  Location: {
    type: String,
    materialForm: {
      floatingLabelText: "Plats",
      hintText: "Vörtpannan el. chock",
    },
  },
  StartTime: {
    type: String,
    optional : false,
    materialForm: {
      floatingLabelText: "Total tid",
      hintText: "2h45m",
    },
  },
  Weather: {
    type: Number,
    allowedValues: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ],
    optional: true,
    label: "Hur var vädret?",
    materialForm: {
      
      options: [
        {label: "Sol", value: 1},
        {label: "Uppehåll", value: 2},
        {label: "Regn", value: 3},
        {label: "Blåsigt", value: 4},
        {label: "Snö", value: 5},
        {label: "Hagel", value: 6},
        {label: "Slask", value: 7},
      ],
    },
  },
   Crowdness: {
    type: Number,
    allowedValues: [
      1,
      2,
      3,
      4,
      5,
    ],
    label: "Hur mycket folk var det?",
    optional: true,
    materialForm: {
     // selectOptions:{
      //  className: "selectExample",
     // },
      options: [
        {label: "Massor", value: 1},
        {label: "Ganska många", value: 2},
        {label: "Inte fler än vad som hanns med", value: 3},
        {label: "Några", value: 4},
        {label: "Inte en jävel", value: 5},
      ],
    },
  },
  Tactic: {
    type: Number,
    allowedValues: [
      1,
      2,
      3,
      4,
    ],
    optional: true,
    label: "Vilken strategi användes?",
    materialForm: {
      options: [
        {label: "Övertalning", value: 1},
        {label: "Glad och trevlig", value: 2},
        {label: "Missionerande", value: 3},
        {label: "Ingen särskild", value: 4},
      ],
    },
  },
  FunLevel: {
    type: Number,
    allowedValues: [
      1,
      2,
      3,
      4,
    ],
    label: "Hur kul var det?",
    optional: true,
    materialForm: {
      selectOptions:{
        className: "selectExample",
      },
      options: [
        {label: "Jävelroligt", value: 1},
        {label: "Kul. Punkt.", value: 2},
        {label: "meh.", value: 3},
        {label: "Jag ville dö", value: 4},
      ],
    },
  },
  Comments: {
    type: String,
    label: "Kommentarer? Idéer på förbättring?",
    optional: true,
    materialForm: {
      rows: 1,
      rowsMax: 10,
      multiLine: true
    }
  },
};

export default Schema;