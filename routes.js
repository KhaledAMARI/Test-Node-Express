const express = require('express')
// eslint-disable-next-line no-unused-vars
let listOfNumbers = []
const getlistNumbers = (req, res) => {
  return res.status(200).send(listOfNumbers);
}
const alterListNumber = (req, res) => {
}
const addNumbers = (req, res) => {
 const {newNumbers} = req.body;
 if (typeof newNumbers === 'object') {
   if (newNumbers.every(number => typeof number === 'number')) {
     listOfNumbers = [...listOfNumbers, ...newNumbers];
     return res.status(200).send(listOfNumbers);
    } else {
      const wrongInputs = newNumbers.filter(number => typeof number === 'string');
      return res.status(501).json({ err: `Non-numeric values :${wrongInputs.join(', ')}` })
    };
 } else {
   return res.status(400).json({});
 }
}
const getNumbersMeanValues = (req, res) => {

}
const deleteNumbers = (req, res) => {
  const {unwantedNumbers} = req.body;
  if (typeof unwantedNumbers === 'object') {
    if (unwantedNumbers.every(number => typeof number === 'number')) {
      let indexArray = [];
     for (const [key, value] of Object.entries(listOfNumbers)) {
       if (unwantedNumbers.includes(value)) {
        indexArray.push(key);
       };
     };
      indexArray.map(index => listOfNumbers.splice(index, 1));
      return res.status(200).send(listOfNumbers);
    } else {
       const wrongInputs = unwantedNumbers.filter(number => typeof number === 'string');
       return res.status(501).json({ err: `Non-numeric values :${wrongInputs.join(', ')}` })
     };
  }  else {
    return res.status(400).json({});
  }
}
module.exports = (app) => {
  app.use(express.json())
  app.get('/Numbers', getlistNumbers)
  app.patch('/Numbers/:operation', alterListNumber)
  app.post('/Numbers', addNumbers)
  app.get('/getNumbersMeanValue', getNumbersMeanValues)
  app.delete('/Numbers', deleteNumbers)
}
