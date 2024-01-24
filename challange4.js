'use strict';

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
dogs.forEach(
  (cur, arr) => (cur.recomendedFoodAmnt = Math.round(cur.weight ** 0.75 * 28))
);
console.log(dogs);
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose)
const sarahsDogObj = dogs.find(obj => obj.owners.includes('Sarah'));
console.log(sarahsDogObj);
if (sarahsDogObj.curFood < sarahsDogObj.recomendedFoodAmnt * 0.9)
  console.log('Sarahs dog eats less than he should');
else if (sarahsDogObj.curFood > sarahsDogObj.recomendedFoodAmnt * 1.1)
  console.log('Sarahs dog eats more than he should');
// �
// �
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
const ownersWhosDogsEatTooMuch = [];
const ownersWhosDogsEatTooLittle = [];
dogs.forEach(object => {
  if (object.curFood > object.recomendedFoodAmnt * 1.1)
    ownersWhosDogsEatTooMuch.push(object.owners);
  else if (object.curFood < object.recomendedFoodAmnt * 0.9)
    ownersWhosDogsEatTooLittle.push(object.owners);
});
console.log(ownersWhosDogsEatTooMuch);
console.log(ownersWhosDogsEatTooLittle);
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
console.log(
  `${ownersWhosDogsEatTooMuch.flat().join(' and ')}'s dogs eat too much!`
);
console.log(
  `${ownersWhosDogsEatTooLittle.flat().join(' and ')}'s dogs eat too little!`
);
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
const areAnyDogsEatExactlyTheAmountTheyShould = dogs.some(
  cur => cur.curFood === cur.recomendedFoodAmnt
);
console.log(areAnyDogsEatExactlyTheAmountTheyShould);
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
const areAnyDogsEatProperly = dogs.some(
  cur =>
    cur.curFood > cur.recomendedFoodAmnt * 0.9 &&
    cur.curFood < cur.recomendedFoodAmnt * 1.1
);
console.log(areAnyDogsEatProperly);
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
const dogsEatingOkArray = dogs.filter(
  cur =>
    cur.curFood > cur.recomendedFoodAmnt * 0.9 &&
    cur.curFood < cur.recomendedFoodAmnt * 1.1
);
console.log(dogsEatingOkArray);
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects
const arraysCopy = [...dogs];
arraysCopy.sort(
  (cur, next) => cur.recomendedFoodAmnt - next.recomendedFoodAmnt
);
console.log(arraysCopy);
