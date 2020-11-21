/* ------------- 1 ------------- */
function mul(num1, num2) {
  return num1 * num2;
}
function square(num) {
  return mul(num, num);
}

const baseArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 40));

const forArray = [];
for (let i = 0; i < baseArray.length; i++) {
  forArray.push(square(baseArray[i]));
}

const forOfArray = [];
for (const value of baseArray) {
  forOfArray.push(square(value));
}

const forInArray = [];
for (const index in baseArray) {
  forInArray.push(square(baseArray[index]));
}

const forEachArray = [];
baseArray.forEach((value) => forEachArray.push(square(value)));

/* ---------- 1 Tests ---------- */
console.assert(square(0) === 0, 'squareTest: 0');
console.assert(square(1) === 1, 'squareTest: 1');
console.assert(square(2) === 4, 'squareTest: 2');
console.assert(square(9) === 81, 'squareTest: 9');
console.assert(square(baseArray[0]) === forArray[0], 'forArray: 0');
console.assert(square(baseArray[1]) === forArray[1], 'forArray: 1');
console.assert(square(baseArray[2]) === forArray[2], 'forArray: 2');
console.assert(square(baseArray[3]) === forArray[3], 'forArray: 3');
console.assert(square(baseArray[4]) === forArray[4], 'forArray: 4');
console.assert(square(baseArray[0]) === forOfArray[0], 'forOfArray: 0');
console.assert(square(baseArray[1]) === forOfArray[1], 'forOfArray: 1');
console.assert(square(baseArray[2]) === forOfArray[2], 'forOfArray: 2');
console.assert(square(baseArray[3]) === forOfArray[3], 'forOfArray: 3');
console.assert(square(baseArray[4]) === forOfArray[4], 'forOfArray: 4');
console.assert(square(baseArray[0]) === forInArray[0], 'forInArray: 0');
console.assert(square(baseArray[1]) === forInArray[1], 'forInArray: 1');
console.assert(square(baseArray[2]) === forInArray[2], 'forInArray: 2');
console.assert(square(baseArray[3]) === forInArray[3], 'forInArray: 3');
console.assert(square(baseArray[4]) === forInArray[4], 'forInArray: 4');
console.assert(square(baseArray[0]) === forEachArray[0], 'forEachArray: 0');
console.assert(square(baseArray[1]) === forEachArray[1], 'forEachArray: 1');
console.assert(square(baseArray[2]) === forEachArray[2], 'forEachArray: 2');
console.assert(square(baseArray[3]) === forEachArray[3], 'forEachArray: 3');
console.assert(square(baseArray[4]) === forEachArray[4], 'forEachArray: 4');
