import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tilt } from 'react-tilt';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box, Typography } from '@mui/material';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SubCard from 'ui-component/cards/SubCard';

const NumberCards = () => {
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const [clients, setClients] = useState([]);
  const reduxCreated = useSelector((state) => state.estimateList.created);
  const reduxApproved = useSelector((state) => state.estimateList.approved);
  const reduxUnApproved = useSelector((state) => state.estimateList.notapproved);
  const reduxRejected = useSelector((state) => state.estimateList.rejected);

  const [cardAnimation, setCardAnimation] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Count the number of rejected and not approved estimates
    const rejectedEstimates = clients.filter((client) => client.status === 'rejected');
    const notApprovedEstimates = clients.filter((client) => client.status !== 'approved');
    const approvedEstimates = clients.filter((client) => client.status === 'approved');
    const createdCount = clients.length;
    const rejectedCount = rejectedEstimates.length;
    const notApprovedCount = notApprovedEstimates.length;

    // Count the number of approved estimates
    const approvedCount = approvedEstimates.length;

    dispatch(setCreated(createdCount));
    dispatch(setApproved(approvedCount));
    dispatch(setRejected(rejectedCount));
    dispatch(setUnApproved(notApprovedCount));
  }, [clients, dispatch]);

  useEffect(() => {
    // Dispatch the async thunk to fetch data from the table
    dispatch(fetchEstimateList()); // Replace 'params' with any necessary parameters
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
    setCardAnimation(true);
  }, []);

  const percent1 = (reduxUnApproved / reduxCreated) * 100;
  const percent2 = (reduxApproved / reduxCreated) * 100;
  const percent3 = (reduxRejected / reduxCreated) * 100;

  return (
    <Box className="card-container" display="flex" gap="25px" width="75%">
      <SubCard className="card">
        <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
          <div className='card-hold'><VerifiedUserOutlinedIcon className='card-icon'/></div> 
          <Typography className='count-create'>{reduxCreated}</Typography>
          <Typography className='tag-name'>Created</Typography>
        </Tilt>
      </SubCard>
      <SubCard className="card">
        <Tilt className={` defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
          <div className='card-hold'>
            <CircularProgressbar
              value={percent1}
              text={`${reduxUnApproved}`}
              styles={{
                root: {},
                path: {
                  stroke: 'rgb(122, 79, 1)'
                },
                text: { fill: 'rgb(122, 79, 1)', fontWeight: '700', fontSize: '25px' }
              }}
            />
          </div>
          <Typography className='split-tag'>Pending</Typography>
        </Tilt>
      </SubCard>
      <SubCard className="card">
        <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <div className='card-hold'>
            <CircularProgressbar
              value={percent2}
              text={`${reduxApproved}`}
              styles={{
                root: {},
                path: {
                  stroke: 'rgb(0, 168, 171)'
                },
                text: { fill: 'rgb(9 120 122)', fontWeight: 'bolder', fontSize: '25px' }
              }}
            />
          </div>
          <Typography className='split-tag'>Approved</Typography>
        </Tilt>
      </SubCard>
      <SubCard className="card">
        <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <div className='card-hold'>
            <CircularProgressbar
              value={percent3}
              text={`${reduxRejected}`}
              styles={{
                root: {},
                path: {
                  stroke: 'rgb(122, 12, 46)'
                },
                text: { fill: 'rgb(122, 12, 46)', fontWeight: '700', fontSize: '25px' }
              }}
            />
          </div>
          <Typography  className='split-tag'>Rejected</Typography>
        </Tilt>
      </SubCard>
    </Box>
  );
};

export default NumberCards;
