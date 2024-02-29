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
        document.querySelector("#apiReturn").style.color = "Red"
        if(base.value !== "" && currency.value !== ""){
            if(apiKey.value !== ""){
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
                            document.querySelector("#apiReturn").style.color = "Black"
                            document.querySelector("#apiReturn").innerHTML = `1 ${baseTxt} is equal to ${rate.toFixed(3)} ${currencyTxt}`
                        }
                    } else {
                        if(data["error-type"] === "invalid-key"){
                            document.querySelector("#apiReturn").innerHTML = "API key is invalid. Please provide a valid API Key"
                        } else {
                            document.querySelector("#apiReturn").innerHTML = `Error Type: ${data["error-type"]}`
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    document.querySelector("#apiReturn").innerHTML = err
                })
            } else {
                document.querySelector("#apiReturn").innerHTML = "Please provide a API Key"
            }
        } else {
            document.querySelector("#apiReturn").innerHTML = "Please select the currencies you want to convert"
        }
        return false;
    }
})