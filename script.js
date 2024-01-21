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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcDisplayBalance = function (movements) {
  return movements.reduce((acc, cur) => acc + cur, 0);
};

labelBalance.textContent = `${calcDisplayBalance(movements)}€`;

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
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

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
const eurToUsd = 1.1;
const movementsUsd = movements.map(movement => movement * 1.1);
console.log(movements);
console.log(movementsUsd);

const movementsDesc = movements.map(element =>
  element > 0
    ? `Deposit of ${Math.abs(element)}`
    : `Withdrawal of ${Math.abs(element)}`
);
console.log(movementsDesc);

// accounts
const initialsArr = [];
const getInitialsOfAnAccount = function (account) {
  const initials = account.owner
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('. ');
  return `${initials}.`;
};

const getInitialsForAllAccounts = function (accounts) {
  accounts.forEach(function (account) {
    account.unsername = getInitialsOfAnAccount(account);
  });
};

getInitialsForAllAccounts(accounts);

console.log(accounts);

// filter
const depositsOnly = movements.filter(movement => movement > 0);
console.log(depositsOnly);

// reduce
const sumOfAllMovements = movements.reduce(
  (acc, cur, ind, arr) => acc + cur,
  0
);
console.log(sumOfAllMovements);

// max value of movements arr
console.log(movements.reduce((acc, cur) => (acc < cur ? cur : acc), 0));
