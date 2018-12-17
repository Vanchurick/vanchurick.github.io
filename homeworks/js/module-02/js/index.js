"use strict";

let userInput;
const numbers = [];
let total = 0;
let counter = 0;
let onlyNumber;

do {
  userInput = prompt("Введите число");
  onlyNumber = Number(userInput);
  if (isNaN(onlyNumber)) {
    alert(
      `Было введено не число. Вы ввели "${userInput}". Попробуйте еще раз.`
    );
  } else {
    numbers.push(onlyNumber);
  }
  counter++;
} while (userInput !== null);

let minusNull = numbers.pop();

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

if (total === 0) {
  alert("Повторите попытку. Введите числа!");
} else {
  alert(`Общая сумма чисел равна ${total}`);
}
