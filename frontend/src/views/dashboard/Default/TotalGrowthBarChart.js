import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { useSelector, useDispatch } from 'react-redux';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../../store/reducers/clientReducer';
import { fetchEstimateList, estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';
import SubCard from 'ui-component/cards/SubCard';

const TotalGrowthBarChart = () => {
  const [clients, setClients] = useState([]);
  const loading = useSelector(estimateListSelector).loading;

  const data = useSelector(estimateListSelector).loadData;
  const dispatch = useDispatch();
  const reduxCreated = useSelector((state) => state.estimateList.created);
  const reduxApproved = useSelector((state) => state.estimateList.approved);
  const reduxUnApproved = useSelector((state) => state.estimateList.notapproved);
  const reduxRejected = useSelector((state) => state.estimateList.rejected);

  console.log(reduxCreated);
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
  const options = {
    animationEnabled: true,
    theme: 'light3',
	title: {
		text: 'Estimations',
		fontSize: 22,
		padding:20,
		fontColor: '#364152',
	},
    axisX: {
      title: 'Status',
      reversed: true,	  
    },
    axisY: {
      title: 'No of Estimations',
      includeZero: true
      // labelFormatter: this.addSymbols
    },
    data: [
      {
        type: 'bar',
        dataPoints: [
          { y: reduxCreated, label: 'Created',color:'rgb(37 198 112 / 91%)' },
          { y: reduxUnApproved, label: 'Pending',color:"rgb(255 171 0 / 90%)" },
          { y: reduxApproved, label: 'Accepted',color:'rgb(0, 184, 217 )' },
          { y: reduxRejected, label: 'Rejected',color:'rgb(255, 86, 48)' }
        ]
      }
    ]
  };
  return (
    <SubCard className='bar-container'>
      <CanvasJSChart options={options} />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </SubCard>
  );
};



export default TotalGrowthBarChart;
