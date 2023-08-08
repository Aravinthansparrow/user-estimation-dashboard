import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './RecentEstimate';
import TotalIncomeDarkCard from './TopClientCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import TopDevelopers from './TopDevelopers';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid spacing={gridSpacing}>
      <Grid item xs={12} mb={3}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={12} sm={12} xs={12} className="grid-one">
            <EarningCard isLoading={isLoading} />
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mb={3}>
        <TotalGrowthBarChart isLoading={isLoading} />
      </Grid>
      <Grid display="flex" gap='22px' style={{ width: '100%' }} item mb={3} >
        <PopularCard />
        <TopDevelopers /> 
      </Grid>
      
    </Grid>
  );
};

export default Dashboard;
