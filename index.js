import WebSocketManager from "./socket.js"
const socket = new WebSocketManager('127.0.0.1:24050')
let hits = []; // initializes hit count array, 
// Store the elements in variables, reducing DOM queries
const marvcountElement = document.getElementById('marvcount');
const perfcountElement = document.getElementById('perfcount');
const greatcountElement = document.getElementById('greatcount');
const goodcountElement = document.getElementById('goodcount');
const badcountElement = document.getElementById('badcount');
const misscountElement = document.getElementById('misscount');
const mainElement = document.getElementById('main');
socket.api_v2((data) => {
  try {
    // Clears counter when not playing
    if (data.state.number !== 2) {
      mainElement.style.opacity = 0;
    } else {
      mainElement.style.opacity = 1;
    }

    // Updates hit counts array
    hits = [data.play.hits.geki, data.play.hits['300'], data.play.hits.katu, data.play.hits['100'], data.play.hits['50'], data.play.hits['0']];
    // Update the innerHTML of the elements
    marvcountElement.innerHTML = data.play.hits.geki;
    perfcountElement.innerHTML = data.play.hits['300'];
    greatcountElement.innerHTML = data.play.hits.katu;
    goodcountElement.innerHTML = data.play.hits['100'];
    badcountElement.innerHTML = data.play.hits['50'];
    misscountElement.innerHTML = data.play.hits['0'];
  } catch (err) {
    console.log(err)
  }
})

const colors = [
  'rgb(136, 198, 255)', // for data.play.hits.geki
  'rgb(255, 255, 0)', // for data.play.hits['300']
  'rgb(0, 255, 0)', // for data.play.hits.katu
  'rgb(34, 116, 192)', // for data.play.hits['100']
  'rgb(255, 0, 255)', // for data.play.hits['50']
  'rgb(255, 0, 0)' // for data.play.hits['0']
];

// initializes chart
const chart = new Chart(document.getElementById("myChart"), {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [], // to be replaced with hits
      backgroundColor: [], // to be replaced with colors
      borderWidth: 0,
    }]
  }
})
//updates chart data
setInterval(() => {
  // updates data by removing values that correspond to hits index values = 0
  chart.data.datasets['0'].data = hits.filter(x => x > 0);
  // updates colors by removing colors that correspond to hits index values = 0
  chart.data.datasets['0'].backgroundColor = colors.filter((x, i) => hits[i] > 0);
  chart.update();
}, 50)
