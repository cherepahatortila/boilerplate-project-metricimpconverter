//тесты проверяют работу функции ConvertHandler. routes.js может работать не корректно (тесты здесь не проверяют routes.js)
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
    test("Testing valid whole number input", () => {
      assert.equal(
      convertHandler.getNum("2kg"),
      2,
      "Correctly read valid whole number input"
    );
  });
    test("Testing decimal number input", () => {
      assert.equal(
      convertHandler.getNum("2.1kg"),
      2.1,
      "Correctly read a decimal number input"
    );
  });
    test("Testing a fractional input", () => {
      assert.strictEqual(
      convertHandler.getNum("4/2kg"),
      2,
      "Correctly read a fractional input"
    );
  });
    test("Testing fractional input with a decimal", () => {
      assert.strictEqual(
      convertHandler.getNum("4.2/2kg"),
      2.1,
      "Correctly  read a fractional input with a decimal"
    );
  });
  test("Testing correctly return an error on a double-fraction (i.e. 3/2/3)", () => {
      assert.strictEqual(
      convertHandler.getNum("4.2/2/2kg"),
      "invalid number",
      "Correctly return an error on a double-fraction (i.e. 3/2/3)");
  });
 test("Testing default to a numerical input of 1 when no numerical input is provided", () => {
      assert.strictEqual(
      convertHandler.getNum("kg"),
      1,
      "Default to a numerical input of 1 when no numerical input is provided");
  });
  test("Testing correctly read each valid input unit", () => {
      assert.strictEqual(
      convertHandler.getUnit("2kg"),"kg");
      assert.strictEqual(
      convertHandler.getUnit("2mi"),"mi");
      assert.strictEqual(
      convertHandler.getUnit("2l"),"L");
      assert.strictEqual(
      convertHandler.getUnit("2lbs"),"lbs");
      assert.strictEqual(
      convertHandler.getUnit("2km"),"km");
      assert.strictEqual(
      convertHandler.getUnit("2gal"),"gal");
  });
  test("Testing return an error for an invalid input unit", () => {
      assert.strictEqual(
      convertHandler.getUnit("2g"),
      "invalid unit",
      "correctly return an error for an invalid input unit"
    );
  });
  test("Testing return the correct return unit for each valid input unit", () => {
      assert.strictEqual(
      convertHandler.getReturnUnit("mi"),"km");
      assert.strictEqual(
      convertHandler.getReturnUnit("km"),"mi");
      assert.strictEqual(
      convertHandler.getReturnUnit("L"),"gal");
      assert.strictEqual(
      convertHandler.getReturnUnit("gal"),"L");
      assert.strictEqual(
      convertHandler.getReturnUnit("kg"),"lbs");
      assert.strictEqual(
      convertHandler.getReturnUnit("lbs"),"kg");
  });
test("Testing return the spelled-out string unit for each valid input unit.", () => {
      assert.strictEqual(
      convertHandler.spellOutUnit("mi"),"miles");
      assert.strictEqual(
      convertHandler.spellOutUnit("kg"),"kilograms");
      assert.strictEqual(
      convertHandler.spellOutUnit("km"),"kilometers");
      assert.strictEqual(
      convertHandler.spellOutUnit("L"),"liters");
      assert.strictEqual(
      convertHandler.spellOutUnit("gal"),"gallons");
      assert.strictEqual(
      convertHandler.spellOutUnit("lbs"),"pounds");
  });
test("correctly convert gal to L", () => {
      assert.strictEqual(
      convertHandler.convert("gal",3),  
      11.35623);
  });
  test("correctly convert L to gal", () => {
      assert.strictEqual(
      convertHandler.convert("L",1),  
      0.26417);
  });
  test("correctly convert mi to km", () => {
      assert.strictEqual(
      convertHandler.convert("mi",3),  
      4.82802);
  });
  test("correctly convert km to mi", () => {
      assert.strictEqual(
      convertHandler.convert("km",3),  
      1.86412);
  });
  test("correctly convert kg to lbs", () => {
      assert.strictEqual(
      convertHandler.convert("kg",3),  
      6.61387);
  });
  test("correctly convert lbs to kg", () => {
      assert.strictEqual(
      convertHandler.convert("lbs",3),  
      1.36078);
  });

})

