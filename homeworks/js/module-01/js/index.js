'use strict'

const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';

const enterLogin = 'Введите ваш логин!';
const enterPassword = 'Введите пароль!';
const wellcome = 'Добро пожаловать!';
const cancel = 'Отменено пользователем!';
const noAccess = 'Доступ запрещен, неверный пароль!';

let userInputLogin = prompt(enterLogin);

if (userInputLogin === adminLogin) {
 let userInputPassword = prompt(enterPassword);
 if (userInputPassword === adminPassword ) {
     alert(wellcome);
 } else if ( userInputPassword === null ) {
     alert(cancel);
 } else {
     alert(noAccess);
 }
} else if ( userInputLogin === null ) {
    alert(cancel);
} else {
    alert(noAccess)
}