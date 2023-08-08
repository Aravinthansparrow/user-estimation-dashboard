// export default TotalGrowthBarChart;
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const themeMode = useSelector((state) => state.customization.themeMode);
  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const darkmode = theme.palette.common.title1
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const ligth2 = theme.palette.common.subtitle;
  const darkViolet = theme.palette.dark.dark2;
  const primary200 = theme.palette.primary.light1;
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.dark;
  const secondaryLight1 = theme.palette.secondary.light;
 
  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: 
      [
        themeMode === 'dark' ? darkmode : darkViolet,
        themeMode === 'dark' ? grey500 :  secondaryMain,
        themeMode === 'dark' ? secondaryLight1 :primary200 ,
        themeMode === 'dark' ? ligth2 : primaryDark,
      ],
      xaxis: {
        labels: {
          style: {
            colors: [
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
              themeMode === 'dark' ? darkmode : primary,
            ]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [themeMode === 'dark' ? darkmode : primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType,themeMode,darkmode, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard style={{position:'relative',zIndex:1000}}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Estimation</Typography>
                    </Grid>
                    <Grid item>
                      {/* <Typography variant="h3">$2,324.00</Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
