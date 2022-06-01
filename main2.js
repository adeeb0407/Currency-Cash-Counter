
let payButton = document.getElementById('pay')

let customerCurrency = document.getElementById("customerCurrency");
let currentCurrencyIndexCustomer = 0;
let currentCurrencyValueCustomer;
let currencySymbolCustomer = "$";

let historyArray = JSON.parse(localStorage.getItem('history'))
let historyVal = document.getElementById('history')
let billAmount = document.getElementById('billAmount').value
let cashGiven = document.getElementById('cashGiven').value

let billAmountVal = document.getElementById('billAmountVal')
let cashGivenPrint = document.getElementById('cashGiven')
let cashToBeGivenPrint = document.getElementById('cashToBeGiven')
let notesPrint = document.getElementById('notes')
let cashHeading = document.getElementById('cashInterface')
let cashInterfaceStyle = document.getElementById('cashier')
cashHeading.innerHTML = 'Cashier Interface'
cashInterfaceStyle.style.padding = '28px 50px 50px 50px'
cashInterfaceStyle.setAttribute('class', 'animate__animated animate__fadeIn')

let history = []

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
this.classList.toggle("active");
var panel = this.nextElementSibling;
if (panel.style.display === "block") {
  panel.style.display = "none";
} else {
  panel.style.display = "block";
}
});
}
fetch('http://localhost:5000/schedule').then(function(response) {
    return response.json();
  }).then(function(data) {
    history = data
      console.log(history);
      document.getElementById('historyVal').innerHTML = history.map((dataItem, index) =>
      `
      <button class="accordion">Transction No - ${index + 1} &nbsp; ${dataItem}</button>
      <div class="panel">
        <p>${dataItem}</p>
      </div>`
  ).join('')
  }).catch(function() {
    console.log("Booo");
  });


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

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/sendTransction", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      transction: `The Total Amount is Been Returned in <br> <b> ${noteList} </b>`,
      date : new Date()
  }));
//   xhr.onload = function() {
//       location.reload();
//   }



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
    // notesPrint.innerHTML =`The Total Amount is Been Returned in <br> <b> ${noteList} </b>` ;
    // history.push(`Total Bill Amount : ${billAmount} ${currencySymbolCustomer} <br> Cash Given Amount : ${cashGiven} ${currencySymbolExchange} <br> ${noteList}`)
    // localStorage.setItem('history',`${JSON.stringify(history)}`)
    // console.log(history)
}

})

