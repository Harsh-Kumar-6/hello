const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "to") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        update_flag(evt.target);
    });
}

const update_flag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalAmount = amtVal*rate;

    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    console.log(rate);
});