// 5.1
class Osoba {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = this._formatujImie(value);
  }
  get age() {
    return this._age;
  }
  set age(value) {
    if (isNaN(value)) {
      throw new TypeError(`age is number, provided value is type of ${typeof value}`);
    }
    if (value < 0) {
      throw new RangeError(`age must be greater or equal 0, provided value is ${value}`);
    }
    this._age = value;
  }
  przedstaw() {
    return `Jestem ${this.name}, mam ${this.age} ${choosePolishNounForm(this.age, 'lat', 'lat', 'lata')}`;
  }
  _formatujImie(value) {
    const [firstLetter, ...rest] = value;
    return `${(firstLetter || '').toUpperCase()}${rest.join('').toLowerCase()}`;
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

// 5.2  &  6.1  &  6.2
const marek = new Pracownik('mAREK', 25, 'portier');
console.log(marek.przedstaw());
try {
  marek.age = 'a';
} catch (e) {
  console.log(e);
}
console.log(marek.przedstaw());
try {
  marek.age = -1;
} catch (e) {
  console.log(e);
}
console.log(marek.przedstaw());
try {
  marek.age = 16;
} catch (e) {
  console.log(e);
}
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
