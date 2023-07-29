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

const SmallEstimateList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin
  dayjs.locale('en'); // Set the locale to English
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the async thunk to fetch data from the table
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
    // setSelectedClientId(clientId);
    console.log(clientId);
    // setShowFilters(false);
    navigate(`/utils/estimate-summary/${clientId}`);
  };

  return (
    <SubCard className="recent-estimate">
      <Box>
        <Typography variant='h2' mb={1.5}>Recent Estimations</Typography>
        <div>
          <Paper  className="recent-header">
            <div className="head-date   mr-29">Date</div>
            <div className="head-name mr-29">Client Name</div>
            <div className="head-by mr-29">Estimated By</div>
            <div className="head-status mr-29">Status</div>
            <div className="head-view">View</div>
          </Paper>
        </div>
        <div className="list-tabs">
          {filteredClients.map((client) => (
            <div className="field-set estimate-new" key={client.id}>
              <div className="head-date">{dayjs(client.createdAt).fromNow()}</div>
              <div className="head-name">{client.clientName}</div>
              <div className="head-by">{client.createdBy}</div>
              <div className="head-status">{client.status}</div>
              <div className="head-view align-l-p">
                <Button className="estimate-btn" onClick={() => handleView(client.id)}>
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
