

let stockData

//intial graph setup
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});

fetchStockData()

function fetchStockData(symbol){
    let key= 'MNOXVD5MJP3TAMK2'
    if(symbol===undefined){
        key='demo'
        symbol='IBM'
    }
    console.log('symbol: ' + symbol)
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`)
    .then(resp=>resp.json())
    .then(data=>stockData=data)
    .then(() => console.log(stockData))
    .then(()=>updateGraph())
    console.log(stockData)
}


function updateGraph(){
//update graph from data retrieved from api
    let closePrices=[]
    let days=[]
    let symbol=stockData['Meta Data']['2. Symbol']
   for(let day in stockData["Time Series (Daily)"]){
    closePrices.unshift(stockData["Time Series (Daily)"][day]["4. close"])
    days.unshift(day)
   }

   console.log('close prices:')
   console.log(closePrices)

   myChart.data={
    labels: days,
    datasets: [{
        label: symbol,
        data: closePrices,
        backgroundColor: [
        ],
        borderWidth: 1
    }]
}
myChart.update()
    
}

