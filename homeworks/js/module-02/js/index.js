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

//доп. задание

const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];
let attempts = 3;
let check;
let userPassword;

do {
  userPassword = prompt("Введите пароль!");
  check = passwords.includes(userPassword);
  if (passwords.includes(userPassword)) {
    alert("Добро пожаловать!");
  } else if (userPassword === null) {
    alert("Отмена пользователем");
  } else {
    attempts = attempts - 1;
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
  }
} while (check === false && attempts !== 0 && userPassword !== null);

if (attempts === 0) {
  alert("У вас закончились попытки, аккаунт заблокирован!");
}