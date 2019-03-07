"use strict";

const URL_ALLUSERS = "https://test-users-api.herokuapp.com/users/";
function getAllUsers() {
  fetch(URL_ALLUSERS)
    .then(response => response.json())
    .then(data => createHTMLAllUsers(data.data))
    .catch(err => console.log(err));
}

function createHTMLAllUsers(arr) {
  let result = arr.reduce(
    (acc, el) =>
      acc +
      `
    <li class="userdata">
        <p>User name: ${el.name}</p>
        <p>Age: ${el.age}</p>
        <p>ID: ${el.id}</p>
    </li>`,
    ""
  );
  let userList = document.querySelector(".allusers__list");
  userList.innerHTML = result;

  aboutUser.textContent = "";
  aboutUser.previousElementSibling.textContent = "User";
}

const getUsersData = document.querySelector(".js-getAllUsers");
getUsersData.addEventListener("click", getAllUsers);
//////////////////////////////////////////////////////////////////////////
function getUserById() {
  fetch(URL_ALLUSERS)
    .then(response => response.json())
    .then(data => filterID(data.data))
    .catch(err => console.log(err));
}

function filterID(arr) {
  let inputID = getUser.previousElementSibling.value.trim();
  let result = arr.filter(el => el.id === inputID);
  let HTML = `
    <p>User name: ${result[0].name}</p>
    <p>Age: ${result[0].age}</p>
    `;
  aboutUser.previousElementSibling.textContent = "This User exists in the database";
  aboutUser.innerHTML = HTML;
}

let oneUserInfo = document.querySelector(".oneuser");
const getUser = document.querySelector(".js-getuser");
getUser.addEventListener("click", getUserById);
//////////////////////////////////////////////////////////////
function addUser(e) {
  e.preventDefault();
  let newName = document.querySelector("#newname");
  let newAge = document.querySelector("#newage");
  let obj = {
    name: newName.value,
    age: +newAge.value
  };

  let options = {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    }
  };

  fetch(URL_ADDUSER, options)
    .then(response => response.json())
    .then(data => createHTMLOneUser(data.data))
    .catch(err => console.log(err));
  addNewUser.reset();
  aboutUser.previousElementSibling.textContent = "Info about new user";
}

function createHTMLOneUser(obj) {
  let HTML = `
    <p>User name: ${obj.name}</p>
    <p>Age: ${obj.age}</p>
    <p>ID: ${obj._id}</p>
    `;

  aboutUser.innerHTML = HTML;
}

let aboutUser = document.querySelector(".aboutuser");
const URL_ADDUSER = "https://test-users-api.herokuapp.com/users";
let addNewUser = document.querySelector(".addnew");
addNewUser.addEventListener("submit", addUser);
///////////////////////////////////////////////////////////////////

function removeUser() {
  let userID = removeUserBtn.previousElementSibling.value.trim();
  fetch(URL_ALLUSERS + userID, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(data => createHTMLRemoveUser(data.data))
    .catch(error => console.log("ERROR: " + error));

  aboutUser.previousElementSibling.textContent = "This user has been deleted";
}

function createHTMLRemoveUser(obj) {
  let HTML = `
    <p>User name: ${obj.name}</p>
    <p>Age: ${obj.age}</p>
    <p>ID: ${obj.id}</p>
    `;

  aboutUser.innerHTML = HTML;
}

let removeUserBtn = document.querySelector(".remove");
removeUserBtn.addEventListener("click", removeUser);

//////////////////////////////////////////////////////////////

function updateUser(e) {
  e.preventDefault();
  let inputID = document.querySelector("#update__id");
  let inputName = document.querySelector("#update__name");
  let inputAge = document.querySelector("#update__age");

  let forUpdate = {
    name: inputName.value.trim(),
    age: +inputAge.value.trim()
  };

  fetch(URL_ALLUSERS + inputID.value.trim(), {
    method: "PUT",
    body: JSON.stringify(forUpdate),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => createHTMLRemoveUser(data.data))
    .catch(error => console.log("ERROR: " + error));

  aboutUser.previousElementSibling.textContent = "Updated User";
  updateUserForm.reset();
}

let updateUserForm = document.querySelector(".update");
updateUserForm.addEventListener("submit", updateUser);
