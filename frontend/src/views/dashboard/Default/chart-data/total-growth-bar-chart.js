import axios from 'axios';

const apiUrl = 'http://localhost:3002/clients/bar';

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //
const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // This will give the current month (0-indexed: January is 0, February is 1, etc.)
const currentYear = currentDate.getFullYear();

// Function to get the number of days in a month
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Generate the dates array for the current month
const datesArray = [];
const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
for (let i = 1; i <= daysInCurrentMonth; i++) {
  datesArray.push(i);
}

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: datesArray.map((date) => date.toString()),
      
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Created',
      data: []
    },
    {
      name: 'UnApproved',
      data: []
    },
    {
      name: 'Approved',
      data: []
    },
    {
      name: 'Rejected',
      data: []
    }
  ]
};

// Fetch data from the API endpoint
axios
  .get(apiUrl)
  .then((response) => {
    const clientData = response.data;
    
    
    // Function to get the date in "YYYY-MM-DD" format
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    // Process the clientData response to get the count of clients created on each day
    const countClientsPerDay = {};
    const countUnApprovedClientsPerDay = {};
    const countApprovedClientsPerDay = {};
    const countRejectedClientsPerDay = {};
    clientData.forEach((data) => {
      const date = formatDate(data.createdAt);
      const status = data.status;

      // Count for 'Created' series
      if (countClientsPerDay[date]) {
        countClientsPerDay[date] += 1;
      } else {
        countClientsPerDay[date] = 1;
      }

      // Count for 'UnApproved' series (filtered by status 'not approved')
      if (status === 'not approved') {
        if (countUnApprovedClientsPerDay[date]) {
          countUnApprovedClientsPerDay[date] += 1;
        } else {
          countUnApprovedClientsPerDay[date] = 1;
        }
      }

      // Count for 'Approved' series (filtered by status 'not approved')
      if (status === 'approved') {
        if (countApprovedClientsPerDay[date]) {
          countApprovedClientsPerDay[date] += 1;
        } else {
          countApprovedClientsPerDay[date] = 1;
        }
      }

      if (status === 'rejected') {
        if (countRejectedClientsPerDay[date]) {
          countRejectedClientsPerDay[date] += 1;
        } else {
          countRejectedClientsPerDay[date] = 1;
        }
      }
    });

    console.log(countClientsPerDay);
    console.log(countUnApprovedClientsPerDay);
    console.log(countApprovedClientsPerDay);
    console.log(countRejectedClientsPerDay);

    const datesArray = [];
    const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = formatDate(`${currentYear}-${currentMonth + 1}-${i}`);
      datesArray.push(date);

      chartData.series[0].data.push(countClientsPerDay[date] || 0);      
      chartData.series[1].data.push(countUnApprovedClientsPerDay[date] || 0);
      chartData.series[2].data.push(countApprovedClientsPerDay[date] || 0); 
      chartData.series[3].data.push(countRejectedClientsPerDay[date] || 0);
    }

    
    console.log(chartData.series[0].data);
    console.log(chartData.series[1].data);
    console.log(chartData.series[2].data); // Data for 'UnApproved' series
    console.log(chartData.series[3].data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
export default chartData;
