// 1
class Osoba {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
  przedstaw() {
    return `Jestem ${this.name}, mam ${this.age} ${choosePolishNounForm(this.age, 'lat', 'lat', 'lata')}`;
  }
}

class Pracownik extends Osoba {
  constructor(name, age, profession) {
    super(name, age);
    this.profession = profession;
  }
  przedstaw() {
    return `${super.przedstaw()} i pracuje jako ${this.profession}`;
  }
}

// 2
const marek = new Pracownik('Marek', 25, 'portier');
console.log(marek.przedstaw());

marek.name = 'Niemarek';
marek.age = 22;

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
