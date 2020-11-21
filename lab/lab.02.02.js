class Samochod {
  constructor(marka, cena, moc) {
    if (typeof marka !== 'string' || isNaN(cena) || isNaN(moc)) {
      throw Error('niepoprane parametry samochodu');
    }
    this.marka = marka;
    this.cena = cena;
    this.moc = moc;
  }
}
Samochod.prototype.zwiekszMoc = function (value) {
  if (isNaN(value) || value < 0) {
    throw Error(`niepoprawna wartość: ${value}, oczekiwana wartość liczbowa większa od 0`);
  }
  this.moc = this.moc + value;
};
Samochod.prototype.toString = function () {
  return `{marka: ${this.marka}, cena: ${this.cena}, moc: ${this.moc}}`;
};
/* ------------- 1 ------------- */
const samochod = new Samochod('Citroen', 120000, 130);
const jsonFromObject = JSON.stringify(samochod);
console.log(jsonFromObject);
/* Matody nie zostały zapisane w reprezentacji JSON, zostały pominięte */

/* ------------- 2 ------------- */
const json = '{ "marka": "Mercedes", "cena": 310000, "moc": 300 }';
const objectFromJson = JSON.parse(json);
objectFromJson.toString = function () {
  return `{marka: ${this.marka}, cena: ${this.cena}, moc: ${this.moc}}`;
};
console.log(objectFromJson.toString());

/* ------ 2 - alternative ------ */
function samochodFromJson(json) {
  const object = JSON.parse(json);
  return new Samochod(object.marka, object.cena, object.moc);
}

const nowySamochod = samochodFromJson(json);
console.log(nowySamochod.toString());
