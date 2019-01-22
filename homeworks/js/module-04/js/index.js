"use strict";
function Cashier(name, productDatabase) {
  this.name = name;
  this.productDatabase = productDatabase;
  this.customerMoney = 0;
  this.getCustomerMoney = function(value) {
    this.customerMoney = value;
  };

  this.countTotalPrice = function(order) {
    let arrayOfPrices = [];
    let totalPrice;
    for (let keys in order) {
      if (order.keys === this.productDatabase.keys) {
        let priceOfOneProduct = order[keys] * this.productDatabase[keys];
        arrayOfPrices.push(priceOfOneProduct);
      }
      totalPrice = 0;
      for (let i = 0; i < arrayOfPrices.length; i++) {
        totalPrice += arrayOfPrices[i];
      }
    }
    return totalPrice;
  };

  this.countChange = function(totalPrice) {
    let change = 0;
    if (this.customerMoney >= totalPrice) {
      change = this.customerMoney - totalPrice;
    } else {
      change = null;
    }
    return change;
  };

  this.onSuccess = function(change) {
    if (change === 0) {
      console.log(`Спасибо за покупку! Спасибо, что без сдачи!`);
    } else {
      console.log(`Спасибо за покупку, ваша сдача ${change} грн.!`);
    }
  };

  this.onError = function() {
    console.log("Очень жаль, вам не хватает денег на покупки");
  };

  this.reset = function() {
    this.customerMoney = 0;
  };
}

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

const mango = new Cashier("Mango", products);
console.log(mango.name); 
console.log(mango.productDatabase); 
console.log(mango.customerMoney); 
const totalPrice = mango.countTotalPrice(order);
console.log("Total price:", totalPrice); 
mango.getCustomerMoney(300);
console.log("Customer cash:", mango.customerMoney); 
const change = mango.countChange(totalPrice);
console.log("Change:", change); 
if (change !== null) {
   mango.onSuccess(change); 
} else {
    mango.onError(); 
};
mango.reset();
console.log(mango.customerMoney); 
