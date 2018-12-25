"use strict";

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

// const isLoginValid = function(login) {
//   return login.length >= 4 && login.length <= 16;
// };

const isLoginValid = login => login.length >= 4 && login.length <= 16;

// const isLoginUnique = function(allLogins, login) {
//   return allLogins.includes(login);
// };

const isLoginUnique = (allLogins, login) => allLogins.includes(login);

const addLogin = function(allLogins = logins, login) {
  if (isLoginValid(login)) {
    if (isLoginUnique(allLogins, login)) {
      alert("Такой логин уже используется!");
    } else {
      allLogins.push(login);
      alert("Логин успешно добавлен!");
    }
  } else {
    alert("Ошибка! Логин должен быть от 4 до 16 символов");
  }
};

do {
  let userLogin = prompt("Enter login");
  if (userLogin === null) {
    alert('Отменено пользователем!');
    break;
  }
  addLogin(logins, userLogin);
} while (logins.length < 10);

console.log(logins);
