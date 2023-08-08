import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import avator_3 from 'assets/images/users/avatar_3.jpg';

const TopDevelopers = () => {
  const [topDeveloperNames, setTopDeveloperNames] = useState([]);
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.customization.themeMode);
  useEffect(() => {
    dispatch(fetchEstimateList());
  }, [dispatch]);

  useEffect(() => {
    console.log(loading, 'loading');
    if (loading === API_STATUS.FULFILLED) {
      console.log('data got Successfully!');
      const allDevelopers = data;
      // Count the occurrence of each client name
      const developerNameCounts = allDevelopers.reduce((counts, client) => {
        const { createdBy } = client;
        counts[createdBy] = (counts[createdBy] || 0) + 1;
        return counts;
      }, {});

      // Sort the client names based on their occurrence
      const sortedDeveloperNames = Object.keys(developerNameCounts).sort((a, b) => developerNameCounts[b] - developerNameCounts[a]);
      
      // Get the top 3 most repeated client names
      const topDeveloperNames = sortedDeveloperNames.slice(0, 7);
      setTopDeveloperNames(topDeveloperNames);
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [loading]);

  return (
    <Box style={{width:'48%'}} className={themeMode === 'dark' ? 'theme-client': 'client-part'}>
      <Typography variant="h3" className="client-titles">
        Top Developers
      </Typography>
      <ul className="client-names">
        {topDeveloperNames.map((createdBy, index) => (
          <Box className="client-box" display="flex" justifyContent="space-between" alignItems="center" key={index}>
              <Box display="flex" gap="8px">
                <div >
                  <img className="client-icon" src={avator_3} alt='client'/>
                </div>
                <Box>
                  <li className="top-names">{createdBy}</li>
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

export default TopDevelopers;