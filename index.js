// Create Chart
createChart();

// Chart
async function createChart() {
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C From 1880 to 2019',
                data: data.ys,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        callback: function (value, index, values) {
                            return value + "°C";
                        }
                    }
                }]
            }
        }
    });
}



// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/



// Get Data
async function getData() {

    const xs = [];
    const ys = [];


    // Fetch data and transform it into text
    const response = await fetch('zonalAnnualMeans.csv');
    const data = await response.text();

    // Tidy data by selecting only year and temp
    const table = data.split('\n').slice(1);
    table.forEach(row => {

        const columns = row.split(',');
        const year = columns[0];
        xs.push(year);
        const temp = columns[1];
        ys.push(parseFloat(temp) + 14);

        // log it to console to see it
        console.log(year, temp);
    });

    return { xs, ys };
}