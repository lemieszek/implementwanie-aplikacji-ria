/* ------------- 2 ------------- */
const nextWithClosure = (function () {
  let value = false;
  return {
    nextValue: function () {
      value = !value;
      return value;
    },
  };
})();

const nextWithGenerator = (function* () {
  let value = false;
  while (true) {
    value = !value;
    yield value;
  }
})();
nextWithGenerator.nextValue = () => nextWithGenerator.next().value;

/* ---------- 2 Tests ---------- */
console.assert(nextWithClosure.nextValue() === true, 'nextWithClosure: 1');
console.assert(nextWithClosure.nextValue() === false, 'nextWithClosure: 2');
console.assert(nextWithClosure.nextValue() === true, 'nextWithClosure: 3');
console.assert(nextWithClosure.nextValue() === false, 'nextWithClosure: 4');
console.assert(nextWithGenerator.nextValue() === true, 'nextWithGenerator: 1');
console.assert(nextWithGenerator.nextValue() === false, 'nextWithGenerator: 2');
console.assert(nextWithGenerator.nextValue() === true, 'nextWithGenerator: 3');
console.assert(nextWithGenerator.nextValue() === false, 'nextWithGenerator: 4');
