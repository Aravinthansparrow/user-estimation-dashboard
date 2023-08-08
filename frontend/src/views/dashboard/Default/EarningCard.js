import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tilt } from 'react-tilt';
import {useTheme} from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box, Typography } from '@mui/material';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SubCard from 'ui-component/cards/SubCard';


const NumberCards = () => {
  const theme = useTheme();
  const loading = useSelector(estimateListSelector).loading;
  const data = useSelector(estimateListSelector).loadData;
  const [clients, setClients] = useState([]);
  const reduxCreated = useSelector((state) => state.estimateList.created);
  const reduxApproved = useSelector((state) => state.estimateList.approved);
  const reduxUnApproved = useSelector((state) => state.estimateList.notapproved);
  const reduxRejected = useSelector((state) => state.estimateList.rejected);
  const themeMode = useSelector((state) => state.customization.themeMode);
  const [cardAnimation, setCardAnimation] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Count the number of rejected and not approved estimates
    const rejectedEstimates = clients.filter((client) => client.status === 'rejected');
    const notApprovedEstimates = clients.filter((client) => client.status == 'not approved');
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
      console.log(data)
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
      <SubCard
        style={{
          backgroundColor:themeMode === 'dark' ? '': theme.palette.secondary.dark,
          color: '#fff',
          overflow: 'hidden',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: -85,
            right: -95,
            [theme.breakpoints.down('sm')]: {
              top: -105,
              right: -140
            }
          }
        }}
        className={themeMode === 'dark' ? 'theme-card' : 'card'}
      >
        
          <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
            <div className="card-hold">
              <VerifiedUserOutlinedIcon className="card-icon" />
            </div>
            <Typography className="count-create">{reduxCreated}</Typography>
            <Typography className="tag-name">Created</Typography>
          </Tilt>
        
      </SubCard>
      <SubCard className={themeMode === 'dark' ? 'theme-card' : 'card'}>
        <Tilt className={` defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
          <div className="card-hold">
            <CircularProgressbar
              value={percent1}
              text={`${reduxUnApproved}`}
              styles={{
                root: {},
                path: {
                  stroke: themeMode === 'dark' ? 'rgb(255, 232, 181)' : ' #1e88e5'
                },
                text: { fill: themeMode === 'dark' ? 'rgb(255, 232, 181)' : '#ede7f6', fontWeight: '700', fontSize: '25px' }
              }}
            />
          </div>
          <Typography className="split-tag">Pending</Typography>
        </Tilt>
      </SubCard>
      <SubCard className={themeMode === 'dark' ? 'theme-card' : 'card'}>
        <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
          <div className="card-hold">
            <CircularProgressbar
              value={percent2}
              text={`${reduxApproved}`}
              styles={{
                root: {},
                path: {
                  stroke: themeMode === 'dark' ? 'rgb(255, 232, 181)' : 'rgb(114 80 174)'
                },
                text: { fill: themeMode === 'dark' ? 'rgb(255, 232, 181)' : 'white', fontWeight: 'bolder', fontSize: '25px' }
              }}
            />
          </div>
          <Typography className="split-tag">Approved</Typography>
        </Tilt>
      </SubCard>
      <SubCard className={themeMode === 'dark' ? 'theme-card' : 'card'}>
        <Tilt className={`defaultcard ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
          <div className="card-hold">
            <CircularProgressbar
              value={percent3}
              text={`${reduxRejected}`}
              styles={{
                root: {},
                path: {
                  stroke: themeMode === 'dark' ? 'rgb(255, 232, 181)' : '#2e72c0'
                },
                text: { fill: themeMode === 'dark' ? 'rgb(255, 232, 181)' : 'white', fontWeight: '700', fontSize: '25px' }
              }}
            />
          </div>
          <Typography className="split-tag">Rejected</Typography>
        </Tilt>
      </SubCard>
    </Box>
  );
};

export default NumberCards;
