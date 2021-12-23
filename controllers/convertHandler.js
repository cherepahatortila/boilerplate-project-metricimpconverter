'use strict';
//параметры для своих функций ConvertHandler возьмет из routes. Здесь просто описана автономная функция ConvertHandler. тесты проверяют ее работу
 function ConvertHandler(){
   //input тут параметр, это не одноименная переменная. 
  this.getNum =function(input) {
   var result= input.replace(/\s*/g,"");//убираем пробелы (пробелы допускаются в input)
  
  //отсеиваем некорректные числа
   if(/[^\w\.\/]/.test(result)) return "invalid number";
  // если есть что-то, помимо a-zA-Z0-9_ и точки
  else if(/\/{2,}|\/{1,}.+\/{1,}|\/[a-zA-Z]/.test(result)) return "invalid number";
  else if(/\d+[a-zA-Z]+\d+/.test(result)) return "letters inside number";
  
  //работаем с точкой и пустым вводом:
  else if(/^\.\d/.test(result))result="0"+result;
  else if(/^\.[a-zA-Z]/.test(result))return "invalid number";
  else if(/\.[a-zA-Z]/.test(result))result=result.replace(/\.[a-zA-Z]/, "");//точка между цифрами и буквами игнорируется 
  else if (!(/^\d/.test(result)))return 1;//if nothing is provided it will default to 1
  
  //деление в input
   if(/\//.test(result)){
   var formula=result.replace(/[a-z]+/i,"");
   result=formula.split("/")[0]/formula.split("/")[1];
   return result;
   }
   else if(/\..*\./.test(result))return "invalid number";//несколько точек - "invalid number". После деления, чтоб можно было делить дробные
  else result = result.match(/\d+(\.){0,1}\d*/)[0];
  return result?result:"invalid number";
  };
  
  this.getUnit=function(input){
    var result = input.match(/[A-Za-z]+/g);
     //match вернет массив, но это ок для ==
    result=="km"||result=="Km"||result=="KM"||result=="kM"||result=="mi"||result=="MI"||result=="Mi"||result=="mI"||result=="kM"||result=="GAL"||result=="gal"||result=="GaL"||result=="gAL"||result=="GAl"||result=="gAl"||result=="L"||result=="l"||result=="Kg"||result=="kg"||result=="KG"||result=="kG"||result=="lbs"||result=="Lbs"||result=="LBS"||result=="LBs"||result=="lBS"||result=="LbS"?result=result[0].toLowerCase():result='invalid unit';
    return result=="l"?"L":result;
  };
  
  this.getReturnUnit = function(initUnit) {
  
    if(initUnit=="mi") return "km";
    else if(initUnit=="km") return "mi";
    else if(initUnit=="L") return "gal";
    else if(initUnit=="gal") return "L";
    else if(initUnit=="lbs") return "kg";
    else if(initUnit=="kg") return "lbs";
  };

  this.spellOutUnit = function(unit) {
    if(unit=="mi") return "miles";
    else if(unit=="km")return "kilometers";
    else if(unit=="L")return "liters";
    else if(unit=="gal")return "gallons";
    else if(unit=="lbs")return "pounds";
    else if(unit=="kg") return "kilograms";
  };
  
  this.convert = function(initUnit,initNum) {
  
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
   if(initUnit=="mi") return +(initNum*miToKm).toFixed(5);
   else if(initUnit=="km") return +(initNum/miToKm).toFixed(5);
   else if(initUnit=="lbs") return +(initNum*lbsToKg).toFixed(5);
   else if(initUnit=="kg") return +(initNum/lbsToKg).toFixed(5);
   else if(initUnit=="gal") return +(initNum*galToL).toFixed(5);
   else if(initUnit=="L") return +(initNum/galToL).toFixed(5);
   else return 'invalid unit';
  };
  
  this.getString = function(initUnit,initNum,returnNum,returnUnit) {
  let result=`${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  return result;
  };
  
}

module.exports = ConvertHandler;
