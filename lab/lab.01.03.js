/* ------------- 3 ------------- */
function suma(...args) {
  return args.reduce((sum, current) => {
    const num = Number(current);
    if (!isNaN(num)) {
      if (isNaN(sum)) {
        sum = 0;
      }
      return sum + num;
    } else {
      return sum;
    }
  }, NaN);
}

/* ---------- 3 Tests ---------- */
console.assert(suma(1) === 1, 'sumTest: 1');
console.assert(suma(1, 2) === 3, 'sumTest: 2');
console.assert(suma(1, 9, 3) === 13, 'sumTest: 3');
console.assert(suma(1, 9, 3, 9) === 22, 'sumTest: 4');
console.assert(suma(3, '6', 'dfdf', 1) === 10, 'sumTest: 5');
console.assert(isNaN(suma('df', 'fdf', 'dfdf')), 'sumTest: 6');
console.assert(isNaN(suma()), 'sumTest: 7');
console.assert(suma(-3, 3) === 0, 'sumTest: 8');
