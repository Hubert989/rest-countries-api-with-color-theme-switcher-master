const down = document.querySelector(".down");
const option = document.querySelectorAll(".option");
const arrow_icon = document.querySelector(".arrow_icon");
const content = document.querySelector(".content");
const moon = document.querySelector(".toogle_btn");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const input_search = document.querySelector(".search");
const select = document.querySelector(".select_header");
const country_information = document.querySelector(".country_information");
const back_btn = document.querySelector(".back_btn");

async function getData() {
    const url = await fetch("https://restcountries.com/v2/all");
    const res = await url.json();
    showCountry(res);
}
getData();



function showCountry(item) {
    for (let i = 0; i < item.length; i++) {
        let item_element = document.createElement('div');
        item_element.classList.add('country');
        item_element.innerHTML =
            `<div class="country_img">
    <img src="${item[i].flag}">
</div>
<div class="country_text">
    <h3 class="country_name">${item[i].name}</h3>
    <div class="country_info">
        <div class="pop">
            <p>Population:</p>
            <span class="population_result">${item[i].population}</span>
        </div>
        <div class="reg">
            <p>Region:</p>
            <span class="region_result">${item[i].region}</span>
        </div>
        <div class="cap">
            <p>Capital:</p>
            <span class="capital_result">${item[i].capital}</span>
        </div>
    </div>
</div>`;
        content.appendChild(item_element);

        item_element.addEventListener("click", () => {

            main.style.display = "none";
            country_information.style.display = "block"
            showCountryDetial(item[i]);
        })
    }

}

function showCountryDetial(data) {
    const information = document.createElement("div");
    information.classList.add("information");

    information.innerHTML =
        `<div class="flag_image">
        <img src="${data.flag}">
    </div>
    <div class="details_1">
        <h2>${data.name}</h2>
        <div class="details">
            <div class="column1">
                <div class="details_info">
                    <p>Native Name:</p>
                    <span>${data.nativeName}</span>
                </div>
                <div class="details_info">
                    <p>Population:</p>
                    <span>${data.population}</span>
                </div>
                <div class="details_info">
                    <p>Region:</p>
                    <span>${data.region}</span>
                </div>
                <div class="details_info">
                    <p>Sub Region:</p>
                    <span>${data.subregion}</span>
                </div>
                <div class="details_info">
                    <p>Capital:</p>
                    <span>${data.capital}</span>
                </div>
            </div>
            <div class="column2">
                <div class="details_info">
                    <p>Top level Domain</p>
                    <span>${data.topLevelDomain.map(elem => elem)}</span>
                </div>
                <div class="details_info">
                    <p>Currencies:</p>
                    <span>${data.currencies.map(elem => elem.name)}</span>
                </div>
                <div class="details_info">
                    <p>Languages:</p>
                    <span>${data.languages.map(elem => elem.name)}</span>
                </div>
            </div>
        </div>
        <div class="border_countries">
            <div class="border">
                <p>Border Countries:</p>
                <div class="border_items">
                    
                </div>
            </div>
        </div>
    </div>`;
    country_information.appendChild(information);
    createborders(data);
}

function createborders(data) {
    const mainContainer = document.querySelector(".border_items");
    for (var i = 0; i < data.borders.length; i++) {
        var div = document.createElement("div");
        div.classList.add("border_item");
        div.innerHTML = data.borders[i];
        mainContainer.appendChild(div);
    }
}

moon.addEventListener("click", () => {
    const item = document.querySelectorAll(".country");
    const border_item = document.querySelectorAll(".border_item");
    header.classList.toggle("dark_header");
    main.classList.toggle("dark_main");
    country_information.classList.toggle("dark_main");
    select.classList.toggle("dark_select");
    input_search.classList.toggle("dark_search");
    down.classList.toggle("dark_select");
    back_btn.classList.toggle("dark_header");
    item.forEach(element => {
        element.classList.toggle("dark_country");
    })
    border_item.forEach(element => {
        element.classList.toggle("dark_country");
    })
})

arrow_icon.addEventListener("click", () => {
    down.classList.toggle("open");
})

back_btn.addEventListener("click", () => {
    const item = document.querySelector(".information");
    main.style.display = "block";
    country_information.style.display = "none";
    item.remove();
})


input_search.addEventListener("input", () => {
    const filter = input_search.value.toLowerCase();
    const Listitems = document.querySelectorAll(".country_name");
    Listitems.forEach((item) => {
        let text = item.textContent;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.parentElement.parentElement.style.display = "";
        }
        else {
            item.parentElement.parentElement.style.display = "none";
        }
    })
});

option.forEach(element =>{
    element.addEventListener("click", ()=>{
        const region_result = document.querySelectorAll(".region_result");
        region_result.forEach(elem =>{
            if(elem.innerText.includes(element.innerText) || element.innerText =="All")
            {
                elem.parentElement.parentElement.parentElement.parentElement.style.display = "grid";
            }
            else{
                elem.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        })
    })
})