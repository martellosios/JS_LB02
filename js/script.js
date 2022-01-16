// Währungen abrufen
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");

// Eingabe abrufen
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

// Wechselkurs abrufen
const rateEl = document.getElementById("rate");

// Wechselknopf abrufen
const swap = document.getElementById("swap");

// "Fetch" Wechselkurse Funktion

// Wechselkurs eingabe berechnen
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // "Fetch" Wechselkurse Funktion API json
  fetch(
    `https://v6.exchangerate-api.com/v6/cbb423278d69ba2d1b7071fc/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
