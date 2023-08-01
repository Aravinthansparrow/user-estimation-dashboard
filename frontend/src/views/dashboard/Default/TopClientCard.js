import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import avator_3 from 'assets/images/users/avatar_3.jpg';

const TopClients = () => {
  const [topClientNames, setTopClientNames] = useState([]);
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEstimateList());
  }, [dispatch]);

  useEffect(() => {
    console.log(loading, 'loading');
    if (loading === API_STATUS.FULFILLED) {
      console.log('data got Successfully!');
      const allClients = data;
      // Count the occurrence of each client name
      const clientNameCounts = allClients.reduce((counts, client) => {
        const { clientName } = client;
        counts[clientName] = (counts[clientName] || 0) + 1;
        return counts;
      }, {});

      // Sort the client names based on their occurrence
      const sortedClientNames = Object.keys(clientNameCounts).sort((a, b) => clientNameCounts[b] - clientNameCounts[a]);
      
      // Get the top 3 most repeated client names
      const topClientNames = sortedClientNames.slice(0, 3);
      setTopClientNames(topClientNames);
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [loading]);

  return (
    <Box className="client-part">
      <Typography variant="h3" className="client-titles">
        Top Clients
      </Typography>
      <ul className="client-names">
        {topClientNames.map((clientName, index) => (
          <Box className="client-box" display="flex" justifyContent="space-between" alignItems="center" key={index}>
              <Box display="flex" gap="8px">
                <div >
                  <img className="client-icon" src={avator_3} alt='client'/>
                </div>
                <Box>
                  <li className="top-names">{clientName}</li>
                  <FavoriteIcon className="favourite" />
                </Box>
              </Box>
              <Box className="event-icon">
                <MilitaryTechIcon />
              </Box>
          </Box>
        ))}
      </ul>
    </Box>
  );
};

export default TopClients;