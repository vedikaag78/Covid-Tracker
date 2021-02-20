

const ul = document.getElementById("country-list");

fetch("https://corona-api.com/countries")
  .then((response) => response.json())
  .then((res) => {
    res.data.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    res.data.map((cnt) => {
      const li = document.createElement("button");
      li.id = cnt.code;
      li.classList.add("country-name");
      console.log(cnt.code);
      li.innerHTML = `<div class="list-col1">${cnt.code}</div><div class="list-col2">${cnt.name}</div><div class="list-col3"><img src="https://www.countryflags.io/${cnt.code}/flat/32.png">
      </div>`;
      li.addEventListener("click", () => {
        getData(cnt.code).then((resp) => {
            document.getElementById(
                "country-selected"
              ).innerHTML = `<div>${cnt.name}</div>`;
            displayData(resp);
        });
      });
      ul.appendChild(li);
    })
    
        getData("IN").then((resp) => {
            document.getElementById(
                "country-selected"
              ).innerHTML = `<div>India</div>`;
            displayData(resp);
        });

  });

const getData = async (countryCode) => {
  const resp = await fetch(`https://corona-api.com/countries/${countryCode}`);
  const data = await resp.json();
  return data;
};

function displayData(resp){
    console.log(resp);
    
    document.getElementById(
      "active-api"
    ).innerHTML = `<div>${resp.data.latest_data.critical}</div>`;
    document.getElementById(
        "recovered-api"
      ).innerHTML = `<div>${resp.data.latest_data.recovered}</div>`;
    
    document.getElementById(
      "confirmed-api"
    ).innerHTML = `<div>${resp.data.latest_data.confirmed}</div>`;
    
    document.getElementById(
      "deaths-api"
    ).innerHTML = `<div>${resp.data.latest_data.deaths}</div>`;

    let graphdata = [];
    resp.data.timeline.map((data) => {
      graphdata.push([new Date(data.date).getTime(),data.active]);
    });
    graphdata.reverse();

    console.log(resp.data.timeline[resp.data.timeline.length - 1].date);

    var options1 = {
      chart: {
        id: "chart2",
        type: "area",
        height: 230,
        foreColor: "#fff",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
      },
      colors: ["rgb(255,69,0)"],
      stroke: {
        width: 2,
      },
      grid: {
        borderColor: "rgb(255,69,0)",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      markers: {
        size: 1,
        colors: ["rgb(255,69,0)"],
        strokeColor: "rgb(255,69,0)",
        strokeWidth: 1,
      },
      series: [
        {
          data: graphdata,
        },
      ],
      tooltip: {
        theme: "light",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        min: 0,
        tickAmount: 4,
      },
    };

    var chart1 = new ApexCharts(
      document.querySelector("#chart-area"),
      options1
    );

    chart1.render();
    chart1.updateSeries([{
      data: graphdata
    }])

    var options2 = {
      chart: {
        id: "chart1",
        height: 100,
        type: "bar",
        foreColor: "#fff",
        brush: {
          target: "chart2",
          enabled: true,
        },
        selection: {
          enabled: false,
          fill: {
            color: "#fff",
            opacity: 0.4,
          },
          xaxis: {
            min: new Date(resp.data.timeline[resp.data.timeline.length - 1].date).getTime(),
            max: new Date(resp.data.timeline[0].date).getTime(),
          },
        },
      },
      colors: ["#f03"],
      series: [
        {
          data: graphdata,
        },
      ],
      stroke: {
        width: 2,
      },
      grid: {
        borderColor: "#333",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 1,
      },
    };

    var chart2 = new ApexCharts(
      document.querySelector("#chart-bar"),
      options2
    );
    chart2.render();
    chart2.updateSeries([{
      data: graphdata
    }])
}

// getData("south-africa").then((resp) => {
//   console.log(resp);
// });



// const init = () => {
//   for (let i = 0; i < document.querySelectorAll(".country-name").length; i++) {
//     console.log(i);
//     document
//       .querySelectorAll(".country-name")
//       [i].addEventListener("click", () => {
//         console.log(i);
//         getData(this.innerHTML).then((resp) => {
//           console.log(resp);
//         });
//       });
//   }
// };

// init();
//document.querySelectorAll(".country-name");
// let totalCases = 0;

// fetch("https://api.covid19api.com/summary")
// .then((response) => response.json())
// .then((res) => {
//     console.log(res.Global.TotalConfirmed)
// })

