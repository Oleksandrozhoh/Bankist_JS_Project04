'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// account balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// display transactions
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const movType = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
        <div class="movements__value">${movement}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// deposits sum
const calcDisplaySumIn = function (movements) {
  const sumIn = movements
    .filter(element => element > 0)
    .reduce((acc, element) => acc + element, 0);
  labelSumIn.textContent = `${sumIn}€`;
};

// withdrawals sum
const calcDisplaySumOut = function (movements) {
  const sumOut = movements
    .filter(element => element < 0)
    .reduce((acc, element) => acc + element, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;
};

// interest sum
const calcDisplayInterest = function (account) {
  const interest = account.movements
    .filter(element => element > 0)
    .reduce(
      (acc, element) =>
        element * (account.interestRate / 100) > 1
          ? acc + element * (account.interestRate / 100)
          : acc,
      0
    );
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// accounts
const initialsArr = [];
const getInitialsOfAnAccount = function (account) {
  const initials = account.owner
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
  return `${initials}`;
};

const getInitialsForAllAccounts = function (accounts) {
  accounts.forEach(function (account) {
    account.username = getInitialsOfAnAccount(account);
  });
};

getInitialsForAllAccounts(accounts);

console.log(accounts);

const updateUiData = function (account) {
  //Display movements
  displayMovements(account.movements);
  // display balance
  calcDisplayBalance(account);
  // display summary
  calcDisplaySumIn(account.movements);
  calcDisplaySumOut(account.movements);
  calcDisplayInterest(account);
};

// login functionality
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form from submiting
  console.log('Login attempt');
  currentAccount = accounts.find(
    account =>
      account.username.toLowerCase() === inputLoginUsername.value.toLowerCase()
  );
  console.log(currentAccount);
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    console.log('Logged in successfuly');
    //display UI and message
    const firstName = currentAccount.owner.split(' ')[0];
    labelWelcome.textContent = `Welcom ${firstName}`;
    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display movements
    displayMovements(currentAccount.movements);
    // display balance
    calcDisplayBalance(currentAccount);
    // display summary
    calcDisplaySumIn(currentAccount.movements);
    calcDisplaySumOut(currentAccount.movements);
    calcDisplayInterest(currentAccount);
  }
});

// transfer functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const accountTransferTo = accounts.find(
    account =>
      account.username.toLowerCase() === inputTransferTo.value.toLowerCase()
  );
  const ammount = Number(inputTransferAmount.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    ammount > 0 &&
    accountTransferTo &&
    ammount <= currentAccount.balance &&
    currentAccount.username !== accountTransferTo?.username
  ) {
    console.log(`Transfering ${ammount} to ${accountTransferTo.owner}`);
    currentAccount.movements.push(-ammount);
    accountTransferTo.movements.push(ammount);

    updateUiData(currentAccount);
  }
});

// loan functionality
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const requestedAmnt = Number(inputLoanAmount.value);
  if (
    requestedAmnt > 0 &&
    currentAccount.movements.some(element => element > requestedAmnt * 0.1)
  ) {
    currentAccount.movements.push(requestedAmnt);
    updateUiData(currentAccount);
  }
  inputLoanAmount.value = '';
});

// delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  const indexToDelete = accounts.findIndex(
    element => element.username.toLowerCase() === username.toLowerCase()
  );
  if (
    username.toLowerCase() === currentAccount.username.toLowerCase() &&
    currentAccount.pin === pin
  ) {
    const deletedAcc = accounts.splice(indexToDelete, 1);
    console.log(`The account of ${deletedAcc[0].owner} was deleted`);
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // slice
// console.log(arr.slice(2));
// console.log(arr.slice(-2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(2, -1));
// console.log(arr.slice()); // shallow copy of an array

// // splice
// console.log(arr.splice(2));
// console.log(arr.splice(1));

// // reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // concat
// console.log(arr.concat(arr2));

// //join
// console.log(arr.join(' '));
// console.log(arr);

// // at
// console.log(arr.at(0));
// console.log(arr.at(1));
// console.log(arr.at(-1)); // last element, wasnt possible with []

// // for each loop
// const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach(function (element) {
//   element > 0
//     ? console.log(`Deposit of ${Math.abs(element)}\n`)
//     : console.log(`Withdrawal of ${Math.abs(element)}\n`);
// });

// //for each with maps
// const currencies1 = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies1.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// map
// const eurToUsd = 1.1;
// const movementsUsd = movements.map(movement => movement * 1.1);
// console.log(movements);
// console.log(movementsUsd);

// const movementsDesc = movements.map(element =>
//   element > 0
//     ? `Deposit of ${Math.abs(element)}`
//     : `Withdrawal of ${Math.abs(element)}`
// );
// console.log(movementsDesc);

// // filter
// const depositsOnly = movements.filter(movement => movement > 0);
// console.log(depositsOnly);

// // reduce
// const sumOfAllMovements = movements.reduce(
//   (acc, cur, ind, arr) => acc + cur,
//   0
// );
// console.log(sumOfAllMovements);

// // max value of movements arr
// console.log(movements.reduce((acc, cur) => (acc < cur ? cur : acc), 0));
