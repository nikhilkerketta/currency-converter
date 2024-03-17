const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".from-to select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let a=0;
for (let select of dropdowns) {
  for (let currCode in countryList) {

    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}
fromCurr.addEventListener("change", (evt) => {
  evt.preventDefault();
  updateFlag(evt.target);
});
toCurr.addEventListener("change", (evt) => {
  updateFlag(evt.target);
});
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  const updateExchangeRate = async() => {
    let amount=document.querySelector("input");
    let amountval=amount.value;
    let response= await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`)
    let data=await response.json();
    let fromC=fromCurr.value.toLowerCase();
    let toC=toCurr.value.toLowerCase();
    const finalData=data[fromC][toC]*amountval;
    msg.innerText=` ${amountval} ${fromC.toUpperCase()} = ${finalData} ${toC.toUpperCase()}`;
  }
  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
  })

  window.addEventListener("load", () => {
    updateExchangeRate();
  });