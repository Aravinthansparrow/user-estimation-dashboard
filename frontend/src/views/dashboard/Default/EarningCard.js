import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tilt } from 'react-tilt';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
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
    <div className="card-container">
      <Tilt className={`card card1 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Created</h3>
        <p>{reduxCreated}</p>
      </Tilt>
      <Tilt className={`card card2 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>UnApproved</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent1}
            text={`${reduxUnApproved}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'white', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
      <Tilt className={`card card3 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Approved</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent2}
            text={`${reduxApproved}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'black', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
      <Tilt className={`card card4 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Rejected</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent3}
            text={`${reduxRejected}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'black', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default NumberCards;
