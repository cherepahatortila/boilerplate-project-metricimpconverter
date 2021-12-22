'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.get('/api/convert', (req,res)=>{

     const input=req.query.input; 
     const convertHandler = new ConvertHandler();
//задаем переменные-параметры для сonvertHandler. Изначально я переменные задавала внутри каждой функции (н/р: getNum()). Но для тестов нужно было прописывать функцию с параметром, поэтому вывела функции-параметры сюда.!обязательно каждая const с параметром/рами, иначе будет  undefined, так как  сonvertHandler -независимая функция, вычисляется для введенных параметров 
     const initUnit= convertHandler.getUnit(input);
     const initNum= convertHandler.getNum(input);
     const returnNum= convertHandler.convert(initUnit,initNum);
     const returnUnit= convertHandler.getReturnUnit(initUnit);
     
    // console.log(...input.match(/[A-Za-z]+/g)); - в сonvertHandler файле выкидывало ошибку из-за spread operator. а здесь работает

     if (initUnit=="invalid unit"&&initNum=="invalid number")
     res.send("invalid number and unit");
    else if(initNum=="invalid number")
       res.send("invalid number");
    else if(initNum=="letters inside number")
       res.send("invalid number");
    else if(initUnit=="invalid unit")
       res.send("invalid unit");
     
    else res.send({
    initNum:initNum,
    initUnit:initUnit,
    returnNum:returnNum,
    returnUnit:returnUnit,
    string:convertHandler.getString(initUnit,initNum,returnNum,returnUnit)
    });
  });

};
