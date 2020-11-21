/* ------------- 1 ------------- */
const car = {
  marka: 'Mercedes',
  cena: 310000,
  moc: 300,
  zwiekszMoc: function (value) {
    if (isNaN(value) || value < 0) {
      throw Error(`niepoprawne value: ${value}, oczekiwana wartość liczbowa większa od 0`);
    }
    this.moc = this.moc + value;
  },
};
/* ------------- 2 ------------- */
console.log(car);
/* ------------- 3 ------------- */
try {
  car.zwiekszMoc('duzo');
  car.zwiekszMoc(-20);
} catch (err) {}
car.zwiekszMoc(20);
/* ------------- 4 ------------- */
console.log(car);
/* ------------- 5 ------------- */
function Samochod(marka, cena, moc) {
  if (typeof marka !== 'string' || isNaN(cena) || isNaN(moc)) {
    throw Error('niepoprane parametry samochodu');
  }
  this.marka = marka;
  this.cena = cena;
  this.moc = moc;
}

Samochod.prototype.zwiekszMoc = function (value) {
  if (isNaN(value) || value < 0) {
    throw Error(`niepoprawna wartość: ${value}, oczekiwana wartość liczbowa większa od 0`);
  }
  this.moc = this.moc + value;
};
/* ------------- 6 ------------- */
const samochody = [new Samochod('Citroen', 120000, 130), new Samochod('Mercedes', 310000, 300), new Samochod('Fiat', 140000, 120)];
/* ------------- 7 ------------- */
for (const samochod of samochody) {
  console.log(samochod);
}
/* ------------- 8 ------------- */
samochody[0].zwiekszMoc(12);
/* ------------- 9 ------------- */
for (const samochod of samochody) {
  console.log(samochod);
}
/* ------------ 10 ------------- */
console.log(samochody[0].toString());
// [object Object]
/* implementacja znajduje się w Samochod.prototype.toString; */

/* ------------ 11 ------------- */
Samochod.prototype.toString = function () {
  return `{marka: ${this.marka}, cena: ${this.cena}, moc: ${this.moc}}`;
};
/* ------------ 12 ------------- */
console.log(samochody[0].toString());
// {marka: Citroen, cena: 120000, moc: 142}
