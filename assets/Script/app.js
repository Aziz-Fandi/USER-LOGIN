const body = document.querySelector('body');
const inputUserName = document.getElementById('userName');
const inputPassword = document.getElementById('passwd');
const logIn = document.getElementById('login');
const submit = document.querySelector('.form form');
const inputsInfo = document.querySelectorAll('.form-control input');
const listNormalUser = document.getElementById('info-normal-user');
const btnOk = document.querySelector('.info button');
const backdrop = document.getElementById('backdrop');
const main = document.querySelector('.info');
const container = document.querySelector('.container');
const form = document.querySelector('.form');
const navLogOut = document.querySelector('.logout');
const btnLogOut = document.getElementById('btnlogout');
const adminUser = document.querySelector('.admin-users');
const UsersTable = document.querySelector('.list-all-users');
const genderFilter = document.getElementById('gender-filter');
const ageFilter = document.getElementById('age-filter');
//__________________________________________________________________________________

let USER_NAME = false;
let EMAIL = false;
let PHONE_NUMBER = false;

let users = [
  {
    name: 'AZIZ',
    password: '00885',
    isAdmin: true,
    age: 27,
    gender: 'male',
    id: 0,
  },

  {
    name: 'ALI',
    password: '0000',
    isAdmin: true,
    age: 50,
    gender: 'male',
    id: 1,
  },

  {
    name: 'MAYA',
    password: '1111',
    isAdmin: false,
    age: 26,
    gender: 'female',
    id: 2,
  },

  {
    name: 'MAJD',
    password: '2222',
    isAdmin: false,
    age: 35,
    gender: 'male',
    id: 3,
  },

  {
    name: 'NOUR',
    password: '3333',
    isAdmin: false,
    age: 45,
    gender: 'female',
    id: 4,
  },

  {
    name: 'AHMAD',
    password: '4444',
    isAdmin: false,
    age: 20,
    gender: 'male',
    id: 5,
  },

  {
    name: 'YAZAN',
    password: '5555',
    isAdmin: false,
    age: 30,
    gender: 'male',
    id: 6,
  },

  {
    name: 'KARAM',
    password: '6666',
    isAdmin: false,
    age: 35,
    gender: 'male',
    id: 7,
  },

  {
    name: 'HUSSAM',
    password: '7777',
    isAdmin: false,
    age: 39,
    gender: 'male',
    id: 8,
  },

  {
    name: 'SARA',
    password: '8888',
    isAdmin: false,
    age: 27,
    gender: 'female',
    id: 9,
  },
];

// delete users
const deleteUserHandler = (id) => {
  let index = 0;
  for (const user of users) {
    if (user.id === id) {
      break;
    }
    index++;
  }
  users.splice(index, 1);
  UsersTable.children[index].remove();
  console.log(index, id);
};
// rendered all user
const renderedAllUser = (allUser) => {
  UsersTable.innerHTML = '';
  allUser.forEach((user) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${user.name}</td>
    <td>${user.password}</td>
    <td>${user.isAdmin}</td>
    <td>${user.age}</td>
    <td>${user.gender}</td>
    <td><button class="delete">X</button></td>
    `;
    UsersTable.append(tr);
  });
  const btnDelete = document.querySelectorAll('.delete');
  let index = 0;
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', deleteUserHandler.bind(null, index));
    index++;
  });
};

let filter = [...users];

// filter by gender
const genderFilterHandler = (e) => {
  if (e.target.value === '1') {
    filter = users.filter((user) => {
      return user.gender === 'male';
    });
  } else if (e.target.value === '2') {
    filter = users.filter((user) => {
      return user.gender === 'female';
    });
  } else {
    filter = users;
  }
  renderedAllUser(filter);
  ageFilter.value = '0';
};

// filter by age
const ageFilterHandler = (e) => {
  let userAge = undefined;
  if (e.target.value === '30') {
    userAge = filter.filter((user) => {
      return user.age <= 30;
    });
  } else if (e.target.value === '40') {
    userAge = filter.filter((user) => {
      return user.age > 30 && user.age <= 40;
    });
  } else if (e.target.value === '50') {
    userAge = filter.filter((user) => {
      return user.age > 40 && user.age <= 50;
    });
  } else {
    userAge = filter;
  }
  renderedAllUser(userAge);
};

// Show form => Normal user
const showForm = () => {
  container.classList.add('hidden');
  form.classList.remove('hidden');
  navLogOut.classList.remove('hidden');
};

// hide form (logout) => normal user
const hideForm = () => {
  container.classList.remove('hidden');
  form.classList.add('hidden');
  navLogOut.classList.add('hidden');
  inputPassword.value = '';

  inputsInfo.forEach((input) => {
    input.value = '';
    input.parentElement.className = 'form-control';
  });
  inputPassword.value = '';
  inputPassword.parentElement.className = 'login-control';
};

//Show table => Admin user
const showTable = () => {
  container.classList.add('hidden');
  navLogOut.classList.remove('hidden');
  adminUser.classList.remove('hidden');
  renderedAllUser(users);
};
//Hide table (logout) => Admin user
const hideTable = () => {
  container.classList.remove('hidden');
  adminUser.classList.add('hidden');
  navLogOut.classList.add('hidden');
  inputPassword.value = '';
  inputPassword.parentElement.className = 'login-control';
};

// show error
const showError = (input, message) => {
  const parentInput = input.parentElement;
  parentInput.className = 'form-control error';
  const small = parentInput.querySelector('small');
  small.innerText = message;
};

// show success
const showSuccess = (input) => {
  const parentInput = input.parentElement;
  parentInput.className = 'form-control success';
};
// show backDrop
const showBackdrop = () => {
  backdrop.classList.add('visible');
};
// remove backDrop
const removeBackdrop = () => {
  backdrop.classList.remove('visible');
};

// rendered normal users
const renderedNormalUser = () => {
  main.classList.add('visible');
  const listUser = document.createElement('li');
  listNormalUser.innerHTML = ``;
  listUser.innerHTML = `
  <div>
  <p><strong>User name:</strong> ${inputsInfo[0].value}</p>
  </div>
  <div>
  <p><strong>Email:</strong> ${inputsInfo[1].value}</p>
  </div>
  <div>
  <p><strong>Phone:</strong> ${inputsInfo[2].value}</p>
  </div>`;
  listNormalUser.append(listUser);
  showBackdrop();
};

// check user name
const checkInfoUser = (min, max) => {
  const infoUser = inputsInfo[0];
  if (infoUser.value.length < min) {
    showError(infoUser, `${infoUser.id} must be at least ${min} charecters`);
    USER_NAME = false;
  } else if (infoUser.value.length > max) {
    showError(infoUser, `${infoUser.id} must be less than ${max} charecters`);
    USER_NAME = false;
  } else {
    showSuccess(infoUser);
    USER_NAME = true;
  }
};

//check email
const checkEmail = () => {
  const email = inputsInfo[1];
  const ck =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (ck.test(email.value.trim())) {
    showSuccess(email);
    EMAIL = true;
  } else {
    showError(email, `${email.id} is not valid`);
    EMAIL = false;
  }
};

//check phone number
const checkPhNumber = (min, max) => {
  const phoneNumber = inputsInfo[2];
  if (phoneNumber.value.length < min) {
    showError(phoneNumber, `${phoneNumber.id}  must be at least ${min} digits`);
    PHONE_NUMBER = false;
  } else if (phoneNumber.value.length > max) {
    showError(
      phoneNumber,
      `${phoneNumber.id}  must be less than ${max} digits`
    );
    PHONE_NUMBER = false;
  } else {
    showSuccess(phoneNumber);
    PHONE_NUMBER = true;
  }
};

// Validation empty form
const validatInputs = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      USER_NAME = false;
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check user name & password
const checkUserHandler = () => {
  const userName = inputUserName.value.toUpperCase();
  const password = inputPassword.value;
  if (userName.trim() === '' || password.trim() === '') {
    alert('Please enter your name and password');
    return;
  }
  let areYouReg = undefined;
  for (const user of users) {
    if (userName === user.name && password === user.password) {
      if (user.isAdmin) {
        showSuccess(inputPassword);
        showTable();
        alert(`Hello admin ${userName}`);
        areYouReg = true;
        break;
      } else {
        showSuccess(inputPassword);
        showForm();
        alert(`Hello ${userName}`);
        areYouReg = true;
        break;
      }
    } else {
      areYouReg = false;
    }
  }
  if (!areYouReg) {
    showError(inputPassword, `${userName} you are not registered`);
  }
};

// submit form add your info
const addInfoHandler = (event) => {
  event.preventDefault();
  validatInputs(inputsInfo);
  checkInfoUser(3, 10);
  checkEmail();
  checkPhNumber(10, 15);
  if (USER_NAME && EMAIL && PHONE_NUMBER) {
    renderedNormalUser();
  }
};

// close your info
const closeYourInfoHandler = () => {
  main.classList.remove('visible');
  removeBackdrop();
};

// log out button
const logOutHandler = () => {
  hideForm();
  hideTable();
  genderFilter.value = '0';
  ageFilter.value = '0';
};

// __________________________________________________events_____________________________________
logIn.addEventListener('click', checkUserHandler);
submit.addEventListener('submit', addInfoHandler);
btnOk.addEventListener('click', closeYourInfoHandler);
btnLogOut.addEventListener('click', logOutHandler);
genderFilter.addEventListener('change', genderFilterHandler);
ageFilter.addEventListener('change', ageFilterHandler);
