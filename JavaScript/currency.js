//The Exchangerate-api has the "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes" url that gets all the currenct supported currencies
//I used a static json file for simplicity.
//Otherwise i would need to provide a API key just to append the options to the selects
import data from './currencies.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {
    const base = document.querySelector("#base");
    const currency = document.querySelector("#currency");
    
    // Commented ou the fetch, because i wanted to use the import command

    //fetch('./currencies.json')
    //.then(response => response.json())
    //.then(data => {
        Object.keys(data).forEach(key => {
            let option = document.createElement("option")
            option.text = data[key]
            option.value = key
            base.appendChild(option)

            //Need to use the cloneNode() method, otherwise only the 'currency' select will be appended
            currency.appendChild(option.cloneNode(true))
        })
    //})
    //.catch(err => {
    //    cosole.log(err)
    //})
    const apiKey = document.querySelector("#apiKey")
    document.querySelector("form").onsubmit = () => {
        const apiReturn =  document.querySelector("#apiReturn")
        apiReturn.style.display = "none"
        apiReturn.classList.remove("alert-success");
        apiReturn.classList.add("alert");
        apiReturn.classList.add("alert-danger");

        const amount = document.querySelector("#amount")
        if(apiKey.value !== ""){
            if(base.value !== "" && currency.value !== ""){
                if(!isNaN(parseFloat(amount.value))){
                    //There are two GET options for the free API user
                    //"https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/BASE-CURENCY" that i'm using in this example
                    //And "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/BASE-CURRENCY/TARGET-CURRENCY"
                    //The second one will return the converted value for the target currency provided
                    //I used the first one to get closer to the example provided in the Harvard edx course
                    fetch(`https://v6.exchangerate-api.com/v6/${apiKey.value}/latest/${base.value}`)
                    .then(response => response.json())
                    .then(data =>{
                        if(data.result === "success"){
                            const rate = data.conversion_rates[currency.value];
                            console.log(rate)
                            if(rate !== undefined){
                                const baseTxt = base.options[base.selectedIndex].text
                                const currencyTxt = currency.options[currency.selectedIndex].text
                                apiReturn.innerHTML = `${amount.value} ${baseTxt} is equal to ${(rate * amount.value).toFixed(3) } ${currencyTxt}`
                                apiReturn.classList.remove("alert-danger");
                                apiReturn.classList.add("alert-success");
                                apiReturn.style.display = "block"
                            }
                        } else {
                            if(data["error-type"] === "invalid-key"){
                                apiReturn.innerHTML = "API key is invalid. Please provide a valid API Key"
                            } else {
                                apiReturn.innerHTML = `Error Type: ${data["error-type"]}`
                            }
                            apiReturn.style.display = "block"
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        apiReturn.innerHTML = err
                    })
                } else {
                    apiReturn.innerHTML = "Please type in a valid amount (Use '.' for decimal)"
                    apiReturn.style.display = "block"
                }        
            } else {
                apiReturn.innerHTML = "Please select the currencies you want to convert"
                apiReturn.style.display = "block"
            }
        } else {
            apiReturn.innerHTML = "Please provide a API Key"
            apiReturn.style.display = "block"
        }
        return false;
    }
})