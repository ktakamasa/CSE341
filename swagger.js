const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API'
  },
  host: 'cse341-ktakamasa.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// got from solution
// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js');
// });
