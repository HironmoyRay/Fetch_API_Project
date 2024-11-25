for (let country in countryList) {
  console.log(country, countryList[country]);
}

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

function updateFlag(element) {
  let curCode = element.value;
  let country = countryList[curCode];
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}
