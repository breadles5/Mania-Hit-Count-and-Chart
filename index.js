import WebSocketManager from "./socket.js"
const socket = new WebSocketManager('127.0.0.1:24050')
let hits = [];

// Update the hit counts array
socket.api_v2((data) => {
  try {
    // Clears counter when not playing
    if (data.state.number !== 2) {
      document.getElementById('main').style.opacity = 0;
    } else {
      document.getElementById('main').style.opacity = 1;
    }

    // Updates hit counts array
    hits = [data.play.hits.geki, data.play.hits['300'], data.play.hits.katu, data.play.hits['100'], data.play.hits['50'], data.play.hits['0']].filter(x => x > 0);

    // Update the innerHTML of the elements
    document.getElementById('marvcount').innerHTML = data.play.hits.geki;
    document.getElementById('perfcount').innerHTML = data.play.hits['300'];
    document.getElementById('greatcount').innerHTML = data.play.hits.katu;
    document.getElementById('goodcount').innerHTML = data.play.hits['100'];
    document.getElementById('badcount').innerHTML = data.play.hits['50'];
    document.getElementById('misscount').innerHTML = data.play.hits['0'];

  } catch (error) {
    console.error(error);
  }
});

// initializes chart
const chart = new Chart(document.getElementById("myChart"), {
  type: 'doughnut',
  data: {
    datasets: [{
      data: hits,
      backgroundColor: [
        'rgb(136, 198, 255)', // for data.play.hits.geki
        'rgb(255, 255, 0)', // for data.play.hits['300']
        'rgb(0, 255, 0)', // for data.play.hits.katu
        'rgb(34, 116, 192)', // for data.play.hits['100']
        'rgb(255, 0, 255)', // for data.play.hits['50']
        'rgb(255, 0, 0)' // for data.play.hits['0']
      ],
      borderWidth: 0,
    }]
  }
})
//updates chart data
setInterval(() => {
  chart.data.datasets['0'].data = hits
  chart.update()
}, 50)
