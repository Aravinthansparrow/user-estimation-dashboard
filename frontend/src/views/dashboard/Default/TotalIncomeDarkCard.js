import React, { useState, useEffect } from 'react';

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import {useDispatch, useSelector } from 'react-redux';
import StarsIcon from '@mui/icons-material/Stars';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
  


const TopClients = () => {
  const [topClientNames, setTopClientNames] = useState([]);
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the async thunk to fetch data from the table
    dispatch(fetchEstimateList()); 
  }, [dispatch]);

  useEffect(() => {
    console.log(loading, 'loading');
    if (loading === API_STATUS.FULFILLED) {
      console.log('data got Successfully!');
      const allClients = data

      // Count the occurrence of each client name
      const clientNameCounts = allClients.reduce((counts, client) => {
        const { clientName } = client;
        counts[clientName] = (counts[clientName] || 0) + 1;
        return counts;
      }, {});

      // Sort the client names based on their occurrence
      const sortedClientNames = Object.keys(clientNameCounts).sort(
        (a, b) => clientNameCounts[b] - clientNameCounts[a]
      );

      // Get the top 3 most repeated client names
      const topClientNames = sortedClientNames.slice(0, 3);

      setTopClientNames(topClientNames);
      
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [loading]);
  // const fetchClients = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3002/clients');
    //   const allClients = response.data;

    //   // Count the occurrence of each client name
    //   const clientNameCounts = allClients.reduce((counts, client) => {
    //     const { clientName } = client;
    //     counts[clientName] = (counts[clientName] || 0) + 1;
    //     return counts;
    //   }, {});

    //   // Sort the client names based on their occurrence
    //   const sortedClientNames = Object.keys(clientNameCounts).sort(
    //     (a, b) => clientNameCounts[b] - clientNameCounts[a]
    //   );

    //   // Get the top 3 most repeated client names
    //   const topClientNames = sortedClientNames.slice(0, 3);

    //   setTopClientNames(topClientNames);
    // } catch (error) {
    //   console.error('Error fetching clients:', error);
    // }
  // };

  return (
    <div className='client-part'>
      <h2 className='client-titles'>Top Clients<PeopleAltRoundedIcon/></h2>
      <ul className='client-names'>
        {topClientNames.map((clientName, index) => (
          <li className='top-names' key={index}><StarsIcon/>{clientName}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopClients;
