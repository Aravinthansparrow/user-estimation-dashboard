// material-ui
import {  Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const WorkItem = () => (

  
  <MainCard title="Workitem Table">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Primary Color">

        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default WorkItem;
