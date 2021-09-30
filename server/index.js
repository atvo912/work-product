const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const fs = require('fs');
const fsPromises = require('fs/promises');


app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

app.get('/', (req, res) => {
  res.json(data);
});


// Data loading steps below

let filePath = path.join(__dirname, 'data', 'WorkProductData.csv');

const data = [];

let promise = fsPromises.readFile(filePath, 'utf8')
.then(result => {
  let csvSplit = result.split('\n');
  // console.log(csvSplit);

  let headers = csvSplit[0].split(',');
  // console.log(headers);

  // iterate through all lines in the CSV
  for (let i = 1; i < csvSplit.length; i++) {
    let rowData = csvSplit[i].split(',');
    // console.log(headers.length, rowData.length);
    let newObj = {};

    // iterate through all fields in each line
    for (let j = 0; j < headers.length; j++) {
      // we may need to ensure that numbers are handled as numbers instead of string
      newObj[headers[j]] = rowData[j];
    }

    // console.log(newObj);
    data.push(newObj);

    console.log(data);
  };

})
.then(result => {
  app.listen(port, function(err) {
    if (err) console.error(err);

    console.log(`Now listening on port ${port}`);
  });
})

