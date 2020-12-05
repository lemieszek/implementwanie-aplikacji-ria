// 1
class Osoba {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  przedstaw() {
    return `Jestem ${this.name}, mam ${this.age} ${choosePolishNounForm(this.age, 'lat', 'lat', 'lata')}`;
  }
}

// 2
const marek = new Osoba('Marek', 25);
console.log(marek.przedstaw());

// 3
marek.name = 'Niemarek';
marek.age = 22;

// 4
console.log(marek.przedstaw());

// Utils
function choosePolishNounForm(number, for0, for1, for2) {
  if (number === 1) {
    return for1;
  }
  if (number % 100 >= 5 && number % 100 <= 21) {
    return for0;
  }
  if (number % 10 >= 2 && number % 10 <= 4) {
    return for2;
  }
  return for0;
}
