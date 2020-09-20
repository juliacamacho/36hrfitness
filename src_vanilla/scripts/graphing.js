let curData = []
let chart = null
let md = 0;
let interval = 5;

function initChart() {
    chart = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    label: "Score",
                    borderColor: "#3e95cd",
                    fill: false
                },
                // {
                //     data: [],
                //     label: "Angular Velocity Y",
                //     borderColor: "#8e5ea2",
                //     fill: false
                // },
                // {
                //     data: [],
                //     label: "Angular Velocity Z",
                //     borderColor: "#3cba9f",
                //     fill: false
                // },
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Your Performance Over Time',
                fontSize: 18
            },
            aspectRatio: 1.15
        }
    });
}

function renderChart(res) {
    // console.log(res)

    // if (!res.length) return;
    // else if (res[0] == "ERASE") {
    //     chart.data.labels = []
    //     chart.data.datasets[0].data = []
    //     chart.data.datasets[1].data = []
    //     chart.data.datasets[2].data = []
    //     lastObtained = -1
    // } else {
    //     lastObtained += res.length
    //
    //     for (var i=0; i<res.length; i++) {
    //         chart.data.labels.push(res[i][0])
    //         chart.data.datasets[0].data.push(res[i][1])
    //         chart.data.datasets[1].data.push(res[i][2])
    //         chart.data.datasets[2].data.push(res[i][3])
    //     }
    // }

    if (res > 1.5) return;

    if ((md++) % interval === 0) {
        chart.data.labels.push(chart.data.labels.length);
        chart.data.datasets[0].data.push(res);
    }

    chart.update()
}

initChart();