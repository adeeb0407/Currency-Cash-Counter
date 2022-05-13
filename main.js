
let payButton = document.getElementById('pay')

let customerCurrency = document.getElementById("customerCurrency");
let currentCurrencyIndexCustomer = 0;
let currentCurrencyValueCustomer;
let currencySymbolCustomer = "$";
let history = []


// let exchangeCurrency = document.getElementById("exchangeCurrency");
// let currentCurrencyIndexExchnage = 0;
// let currentCurrencyValueExchange;
 let currencySymbolExchange = "₹";
// console.log(currentCurrencyIndexExchnage)
// console.log(currentCurrencyIndexCustomer)

customerCurrency.addEventListener('change', function () {
    var i = customerCurrency.selectedIndex;
    currentCurrencyIndexCustomer = i;
})
// exchangeCurrency.addEventListener('change', function () {
//     var i = exchangeCurrency.selectedIndex;
//     currentCurrencyIndexExchnage = i;
// })

payButton.addEventListener('click', function () {

    // if(currentCurrencyIndexExchnage === 0){
    //     currentCurrencyValueExchange = 1;
    // }else if(currentCurrencyIndexExchnage === 1){
    //     currentCurrencyValueExchange = 80.38;
    //     currencySymbol = "¥"
    // }else if(currentCurrencyIndexExchnage === 2){
    //     currentCurrencyValueExchange = 252.07;
    //     currencySymbol = "€"
    // }else if(currentCurrencyIndexExchnage === 3){
    //     currentCurrencyValueExchange = 252.07;
    //     currencySymbol = "KWD"
    // }else if(currentCurrencyIndexExchnage === 4){
    //     currentCurrencyValueExchange = 1;
    //     currencySymbol = "₹"
    // }else{
    //     console.log("Error")
    // }

    if(currentCurrencyIndexCustomer === 0){
        currentCurrencyValueCustomer = 77.36;
    }else if(currentCurrencyIndexCustomer === 1){
        currentCurrencyValueCustomer = 80.38;
        currencySymbolCustomer = "¥"
    }else if(currentCurrencyIndexCustomer === 2){
        currentCurrencyValueCustomer = 252.07;
        currencySymbolCustomer = "€"
    }else if(currentCurrencyIndexCustomer === 3){
        currentCurrencyValueCustomer = 252.07;
        currencySymbolCustomer = "KWD"
    }else if(currentCurrencyIndexCustomer === 4){
        currentCurrencyValueCustomer = 1;
        currencySymbolCustomer = "₹"
    }else{
        console.log("Error")
    }

    console.log(currentCurrencyValueCustomer)
    let billAmount = document.getElementById('billAmount').value
    let cashGiven = document.getElementById('cashGiven').value

    let billAmountVal = document.getElementById('billAmountVal')
    let cashGivenPrint = document.getElementById('cashGiven')
    let cashToBeGivenPrint = document.getElementById('cashToBeGiven')
    let historyVal = document.getElementById('history')
    console.log(history)

    let cashToBeReturned = Math.floor((cashGiven - billAmount)*currentCurrencyValueCustomer)

    let error = document.getElementById('error')
    error.style.color = '#BA1C12'
    if(billAmount == ''){
        error.innerHTML = 'Please Enter the Bill Amount';
    }else if(cashGiven == ''){
        error.innerHTML = 'Please Enter the Cash Given'
    }else if(cashToBeReturned < 0){
        error.innerHTML = 'Please Pay More to Reach the Bill Amount, <br>' + '<b>' +Math.abs(cashToBeReturned)+'</b>' + ' more needed'
    }else{
        error.innerHTML = ''

    let notesPrint = document.getElementById('notes')
    let cashHeading = document.getElementById('cashInterface')
    let cashInterfaceStyle = document.getElementById('cashier')
    cashHeading.innerHTML = 'Cashier Interface'
    cashInterfaceStyle.style.padding = '28px 50px 50px 50px'
    cashInterfaceStyle.setAttribute('class', 'animate__animated animate__fadeIn')

    
        billAmountVal.innerText = `Total Bill Amount : ${billAmount} ${currencySymbolCustomer}`
        cashGivenPrint.innerText = `Cash Given Amount : ${cashGiven}`
            cashToBeGivenPrint.innerText = `Cash to be Returned Amount : ${cashToBeReturned} ${currencySymbolExchange}`

    let cashDenomination = [ 2000, 500, 200, 100, 50, 20, 10, 5, 1 ];
    let noteCounter = Array(9).fill(0);
    
    for (let i = 0; i < 9; i++) {
        if (cashToBeReturned >= cashDenomination[i]) {
            noteCounter[i] = Math.floor(cashToBeReturned / cashDenomination[i]);
            cashToBeReturned = cashToBeReturned - noteCounter[i] * cashDenomination[i];
        }
    }
    
    noteList = ''
    for (let i = 0; i < 9; i++) {
        if (noteCounter[i] != 0) {
        noteList +=  `${cashDenomination[i]}rs : ${noteCounter[i]} Notes <br> ` ;
        }
    }
    notesPrint.innerHTML =`The Total Amount is Been Returned in <br> <b> ${noteList} </b>` ;
    history.push(noteList)
    localStorage.setItem('history', history)
    console.log(noteList[0])
}

})

