// Währungen abrufen,
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");

// Eingegebener Wert/ Zahl abrufen
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

// Wechselkurs unten abrufen
const rateEl = document.getElementById("rate");

// Wechselknopf abrufen
const swap = document.getElementById("swap");




// Wechselkurs eingabe berechnen
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // "Fetch" = holt Wechselkurse dynamisch von API API json
  fetch(
    `https://v6.exchangerate-api.com/v6/cbb423278d69ba2d1b7071fc/latest/${currency_one}`
  )
  // sobald fetch erfolgreich -> response = restart json
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      // greift auf wechselkurse zu
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}



// Event Listeners

// Schaut nach änderung von währung 1 und löst die kalkulation mit dem neuen kurs
currencyEl_one.addEventListener("change", calculate);
// Schaut nach änderung von Input/eingegebene Zahl und löst die kalkulation
amountEl_one.addEventListener("input", calculate);

// Schaut nach änderung von Währung 2 und löst die kalkulation mit dem neuen kurs
currencyEl_two.addEventListener("change", calculate);
// Schaut nach änderung von Input/eingegebene Zahl und löst kalkuliert
amountEl_two.addEventListener("input", calculate);


// Wenn Button clicked werden currencys gewechselt
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
