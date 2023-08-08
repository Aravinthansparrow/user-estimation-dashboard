import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SubCard from 'ui-component/cards/SubCard';

// Import the relativeTime plugin
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; 
import 'dayjs/locale/en';
import { useTheme } from '@emotion/react';

const SmallEstimateList = () => {
  const theme = useTheme()
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const themeMode = useSelector((state) => state.customization.themeMode);     
  dayjs.extend(relativeTime); 
  dayjs.locale('en'); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
// Dispatch the async thunk to fetch data from the table
  useEffect(() => {
    dispatch(fetchEstimateList());
  }, [dispatch]);

  useEffect(() => {
    console.log(loading, 'loading');
    if (loading === API_STATUS.FULFILLED) {
      console.log('data got Successfully!');
      setClients(data);
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [loading]);

  useEffect(() => {
    const lastFiveClients = clients.slice(-5).reverse(); // Get the last 5 elements
    setFilteredClients(lastFiveClients);
  }, [clients]);

  const handleView = (clientId) => {
   
    console.log(clientId);
   navigate(`/utils/estimate-summary/${clientId}`);
  };

  return (
    <SubCard style={{width:'48%'}} className={themeMode === 'dark' ? 'theme-estimate': 'recent-estimate'}>
      <Box>
        <Typography style={{fontSize:'20px'}} color={themeMode === 'dark' ? theme.palette.common.title1 : 'black'} variant='h2' mb={1.5}>Recent Estimations</Typography>
        <div>
          <Paper style={{
            background:themeMode === 'dark' ? theme.palette.common.title2 : theme.palette.common.light1,
            color:themeMode === 'dark' ? theme.palette.common.black : theme.palette.secondary.main,
            }}  
            className="recent-header">
            <div className="head-date mr-29">Date</div>
            <div className="head-name mr-29">Client Name</div>
            <div className="head-by mr-29">Estimated By</div>
            <div className="head-status mr-29">Status</div>
            <div className="head-view">View</div>
          </Paper>
        </div>
        <div className="list-tabs">
          {filteredClients.map((client) => (
            <div style={{
              color:themeMode === 'dark' ? theme.palette.common.title2 : theme.palette.common.black,
              }} 
              className="field-set estimate-new" key={client.id}
            >
              <div className="head-date">{dayjs(client.createdAt).fromNow()}</div>
              <div className="head-name">{client.clientName}</div>
              <div className="head-by">{client.createdBy}</div>
              <div className="head-status">{client.status}</div>
              <div className="head-view align-l-p">
                <Button 
                  className={themeMode === 'dark' ? 'theme-btn':"estimate-btn" }
                  onClick={() => handleView(client.id)}>
                  <VisibilityIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </SubCard>
  );
};

export default SmallEstimateList;
