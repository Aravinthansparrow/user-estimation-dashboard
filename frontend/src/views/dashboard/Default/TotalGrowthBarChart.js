import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//var CanvasJSReact = require('@canvasjs/react-charts');
import { useSelector, useDispatch } from 'react-redux';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../../store/reducers/clientReducer';
import { fetchEstimateList,  estimateListSelector } from '../../../store/reducers/clientReducer';
import { API_STATUS } from '../../../utils/constants';

const TotalGrowthBarChart = () => {
	
    const [clients, setClients] = useState([]);
const loading = useSelector(estimateListSelector).loading;

const data = useSelector(estimateListSelector).loadData;
const dispatch = useDispatch();
const reduxCreated = useSelector((state) => state.estimateList.created);
const reduxApproved = useSelector((state) => state.estimateList.approved);
const reduxUnApproved = useSelector((state) => state.estimateList.notapproved);
const reduxRejected = useSelector((state) => state.estimateList.rejected);
console.log(reduxCreated)
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
			theme: "light2",
			title:{
				text: "Estimations"
			},
			axisX: {
				title: "Status",
				reversed: true,
			},
			axisY: {
				title: "Number of estimations",
				includeZero: true,
				// labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y: reduxCreated , label: "Created" },
					{ y: reduxUnApproved, label: "UnApproved" },
					{ y: reduxApproved, label: "Accepted" },
					{ y: reduxRejected, label: "Rejected" },
				
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	// addSymbols(e){
	// 	var suffixes = ["", "K", "M", "B"];
	// 	var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
	// 	if(order > suffixes.length - 1)
	// 		order = suffixes.length - 1;
	// 	var suffix = suffixes[order];
	// 	return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	// }

export default TotalGrowthBarChart;  