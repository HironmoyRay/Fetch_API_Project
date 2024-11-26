const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const dropdown = document.querySelectorAll(".dropdown select");

for (let select of dropdown) {
  for (let country in countryList) {
    const option = document.createElement("option");
    option.value = country;
    option.innerText = country;
    if (select.name == "from" && country == "USD") {
      option.selected = "selected";
    } else if (select.name == "to" && country == "BDT") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const fromField = document.querySelector(".from select");
let fromFieldCur = fromField.value.toLowerCase();
fromField.addEventListener("change", () => {
  fromFieldCur = fromField.value.toLowerCase();
});

const toField = document.querySelector(".to select");
let toFieldCur = toField.value.toLowerCase();
toField.addEventListener("change", () => {
  toFieldCur = toField.value.toLowerCase();
});

function updateFlag(element) {
  let curCode = element.value;
  let country = countryList[curCode];
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

const btn = document.querySelector("form button");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputField = document.querySelector(".amount input");
  let inputVal = inputField.value;
  if (inputVal == "" || inputVal < 1) {
    inputVal = 1;
    inputField.value = "1";
  }
  //   console.log(fromFieldCur);
  //   console.log(toFieldCur);

  //   console.log(inputVal);
  let res = await fetch(url);
  let data = await res.json();
  let fromVal = data.eur[fromFieldCur];
  let toVal = data.eur[toFieldCur];
  //   console.log(fromVal, toVal);
  let rate = ((toVal / fromVal) * inputVal).toFixed(2);
  //   console.log(rate);

  const msgField = document.querySelector(".msg");
  msgField.innerText = `${inputVal} ${fromFieldCur.toUpperCase()} = ${rate} ${toFieldCur.toUpperCase()}`;
});
