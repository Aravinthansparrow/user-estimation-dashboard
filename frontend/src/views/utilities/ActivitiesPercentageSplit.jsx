import React, { useState, useEffect } from 'react';
import {
  fetchActivities,
  addActivityAction,
  updateActivityAction,
  activitiesSelector,
  deleteActivityAction,
  setDeletedActivityId
} from 'store/reducers/activityReducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'ui-component/cards/MainCard';
import { API_STATUS } from '../../utils/constants';
import {
  Table,
  Paper,
  TableContainer,
  InputLabel,
  TableHead,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  DialogActions,
  Box
} from '@mui/material';
const YourComponent = () => {
  const [data, setData] = useState([]);
  const themeMode = useSelector((state) => state.customization.themeMode);
  const [newActivity, setNewActivity] = useState('');
  const [newPercentage, setNewPercentage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editedActivity, setEditedActivity] = useState('');
  const [editedPercentage, setEditedPercentage] = useState('');
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const activitiesloading = useSelector(activitiesSelector).activitiesloading;
  const addActivityloading = useSelector(activitiesSelector).addActivityloading;
  const updateActivityloading = useSelector(activitiesSelector).updateActivityloading;
  const deleteActivityloading = useSelector(activitiesSelector).deleteActivityloading;
  const activitiesData = useSelector(activitiesSelector).loadData;
  const addactivitiesData = useSelector(activitiesSelector).addloadData;
  const deleteActivityId = useSelector(activitiesSelector).deletedActivityId;

  useEffect(() => {
    console.log(data);
  }, [data]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    console.log(activitiesloading, 'loading');
    if (activitiesloading === API_STATUS.FULFILLED) {
      console.log('activities data got Successfully!');
      setData(activitiesData);
    }
    if (activitiesloading === API_STATUS.REJECTED) {
      console.log('Activities data got failed');
    }
  }, [activitiesloading]);

  useEffect(() => {
    console.log(addActivityloading, 'loading');
    if (addActivityloading === API_STATUS.FULFILLED) {
      console.log('activities data added got Successfully!');
      setData([...data, addactivitiesData]);
      setNewActivity('');
      setNewPercentage('');
      setShowPopup(false);
    }
    if (addActivityloading === API_STATUS.REJECTED) {
      console.log('Activities data adding  got failed');
    }
  }, [addActivityloading]);

  useEffect(() => {
    console.log(updateActivityloading, 'loading');
    if (updateActivityloading === API_STATUS.FULFILLED) {
      console.log('activities data updated got Successfully!');
      const updatedItems = data.map((item) =>
        item.id === selectedItemId ? { ...item, activity: editedActivity, percentagesplit: editedPercentage } : item
      );
      setData(updatedItems);
      setShowEditPopup(false);
    }
    if (updateActivityloading === API_STATUS.REJECTED) {
      console.log('Activities data updating  got failed');
    }
  }, [updateActivityloading]);

  useEffect(() => {
    console.log(deleteActivityloading, 'loading');
    if (deleteActivityloading === API_STATUS.FULFILLED) {
      console.log(deleteActivityId);
      console.log('activities data deleted got Successfully!');
      const filteredItems = data.filter((item) => item.id !== deleteActivityId);
      console.log(filteredItems);
      setData(filteredItems);
    }
    if (deleteActivityloading === API_STATUS.REJECTED) {
      console.log('Activities data deleting  got failed');
    }
  }, [deleteActivityloading]);

  const handleAdd = () => {
    // Check if both newActivity and newPercentage are filled
    if (newActivity.trim() !== '' && newPercentage.trim() !== '') {
      const parsedPercentage = parseFloat(newPercentage);
      
      // Calculate the current total percentage
      const currentTotalPercentage = calculateTotalPercentage();
  
      // Calculate the total percentage after adding the new activity
      const updatedTotalPercentage = currentTotalPercentage + parsedPercentage;
  
      // Check if the updated total percentage is less than or equal to 100
      if (updatedTotalPercentage <= 100) {
        // If the percentage is valid, add the new activity
        dispatch(
          addActivityAction({
            activity: newActivity,
            percentagesplit: newPercentage
          })
        );
        // Reset the input fields and close the popup
        setNewActivity('');
        setNewPercentage('');
        setShowPopup(false);
      } else {
        // Calculate the remaining available percentage to add
        const remainingPercentage = 100 - currentTotalPercentage;
  
        // Show a toast notification with the remaining available percentage
        toast.error(`Total percentage cannot exceed 100%. Remaining: ${remainingPercentage.toFixed(2)}%`, {
          position: 'top-right',
          autoClose: 3000
        });
      }
    } else {
      console.log('Please fill in both Activity and Percentage Split fields before adding.');
    }
  };
  
  const handlePercentageChange = (event) => {
    let enteredValue = event.target.value;

    // Convert the entered value to a number
    const percentageValue = parseInt(enteredValue);

    // Check if the entered value is a number and within the range of 1 to 100
    if (!isNaN(percentageValue) && percentageValue >= 1 && percentageValue <= 100) {
      // If the value is valid, update the newPercentage state
      setNewPercentage(enteredValue);
      setEditedPercentage(enteredValue);
    } else {
      // If the value is invalid, set the nearest valid value (either 1 or 100)
      if (percentageValue < 1) {
        setNewPercentage('1');
        setEditedPercentage('1');
      } else if (percentageValue > 100) {
        setNewPercentage('100');
        setEditedPercentage('100');
      }
    }
  };

  const handleDeleteConfirm = (id) => {
    setShowConfirmDeleteModal(true);
    setSelectedItemId(id);
  };

  // Function to handle delete cancellation
  const handleDeleteCancel = () => {
    setShowConfirmDeleteModal(false);
    setSelectedItemId(null);
  };

  const handleDeleteConfirmAction = () => {
    if (selectedItemId !== null) {
      dispatch(deleteActivityAction(selectedItemId));
      dispatch(setDeletedActivityId(selectedItemId)); // This sets the activity ID to be deleted in the reducer
      setShowConfirmDeleteModal(false);
      toast.success('Activity percentage successfully deleted.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const handleEditClick = (id, activity, percentage) => {
    setSelectedItemId(id);
    setEditedActivity(activity);
    setEditedPercentage(percentage);
    setShowEditPopup(true);
  };

  const handleEditSubmit = () => {
    // Convert the edited percentage to a number
    const parsedPercentage = parseFloat(editedPercentage);

    if (editedActivity.trim() !== '' && !isNaN(parsedPercentage) && parsedPercentage >= 1 && parsedPercentage <= 100) {
      // Calculate the current total percentage excluding the selected item's percentage
      const currentTotalPercentage =
        calculateTotalPercentage() - parseFloat(data.find((item) => item.id === selectedItemId).percentagesplit);

      // Calculate the updated total percentage after adding the new percentage
      const updatedTotalPercentage = currentTotalPercentage + parsedPercentage;

      if (updatedTotalPercentage <= 100) {
        dispatch(
          updateActivityAction({
            id: selectedItemId,
            activity: editedActivity,
            percentagesplit: editedPercentage
          })
        );

        // Close the edit popup after successful submission
        setShowEditPopup(false);
      } else {
        // Show a toast notification when the total percentage exceeds 100
        toast.error('Total percentage cannot exceed 100%.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } else {
      // Show a toast notification when the percentage is invalid
      toast.error('Please enter a valid activity and percentage (1 to 100).', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const calculateTotalPercentage = () => {
    const total = data.reduce((sum, item) => sum + parseFloat(item.percentagesplit), 0);
    return total.toFixed(2);
  };
  return (
    <MainCard style={{ height: '100%' }} title="Activities and Percentage Split">
      <Box display="flex" mb={3} justifyContent="end">
        <Button className="component-title" onClick={() => setShowPopup(true)}>
          Add
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
        <TableHead className={themeMode === 'dark' ? 'theme-head' : 'activity-head'}>
            <TableRow >
              <TableCell style={{ width: '40%', padding: '9px 13px' }}>Activities</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Percentage Split</TableCell>
              <TableCell style={{ width: '40%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow style={{ background: themeMode === 'dark' ? '#191f45' : '' }}  key={item.id} className="act-row">
                <TableCell className="activity-title border-null" style={{color:themeMode === 'dark' ? '#fff' : '' }}>{item.activity}</TableCell>
                <TableCell className="border-null" style={{color:themeMode === 'dark' ? '#fff' : '' , textAlign: 'center' }}>
                  {item.percentagesplit}
                </TableCell>

                <TableCell className=" border-null">
                  {' '}
                  <Box display="flex" gap="12px" justifyContent="center">
                    <Button
                      variant="contained"
                      className=" view-btn"
                      onClick={() => handleEditClick(item.id, item.activity, item.percentagesplit)}
                    >
                      <EditIcon  />
                    </Button>
                    <Button variant="contained" className=" view-btn" onClick={() => handleDeleteConfirm(item.id)}> 
                      <DeleteIcon  />
                    </Button>{' '}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" alignItems="center" className={themeMode === 'dark' ? 'theme-total' : 'total-box'}>
          <Typography style={{ width: '40%' }} className="tot-para" variant="h3">
            Total Percentage Split:
          </Typography>
          <Typography style={{ width: '20%', textAlign: 'center' }} className="tot-para" variant="h3">
            {' '}
            {calculateTotalPercentage()}%
          </Typography>
        </Box>
      </TableContainer>
      {/* Set Add Activity Modal */}
      <Dialog isOpen={showPopup} contentLabel="Complexity Level Modal" className="modal" overlayClassName="modal-overlay">
        <DialogActions style={{background:themeMode==='dark' ? '#191f45' : "#fff"}} className="modal-content flex-column">
          <Typography variant="h3">Add New Entry</Typography>
          <Box display="flex">
            <InputLabel style={{color:themeMode==='dark' ? '#FFF6E0' : ""}} className="content-label">Activity</InputLabel>
            <TextField
              fullWidth
              required
              style={{ minWidth: '200px' }}
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
          </Box>
          <Box display="flex">
            <InputLabel style={{color:themeMode==='dark' ? '#FFF6E0' : ""}} className="content-label">Percentage Split</InputLabel>
            <TextField
              fullWidth
              required
              style={{ minWidth: '200px' }}
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={newPercentage}
              onChange={(e) => setNewPercentage(e.target.value)}
              onKeyUp={handlePercentageChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={handleAdd}>
              Submit
            </Button>
            <Button variant="contained" className="primary-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* Edit Activity percentage Modal */}
      <Dialog isOpen={showEditPopup} contentLabel="Complexity Level Modal" className="modal" overlayClassName="modal-overlay">
        <DialogActions style={{background:themeMode==='dark' ? '#191f45' : "#fff"}} className="modal-content flex-column">
          <Typography variant="h3">Edit Entry</Typography>
          <Box display="flex">
            <InputLabel style={{color:themeMode==='dark' ? '#FFF6E0' : ""}} className="content-label">Activity</InputLabel>
            <TextField
              fullWidth
              required
              style={{ minWidth: '200px' }}
              type="text"
              value={editedActivity}
              onChange={(e) => setEditedActivity(e.target.value)}
            />
          </Box>
          <Box display="flex">
            <InputLabel style={{color:themeMode==='dark' ? '#FFF6E0' : ""}} className="content-label">Percentage Split</InputLabel>
            <TextField
              fullWidth
              required
              style={{ minWidth: '200px' }}
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={editedPercentage}
              onChange={(e) => setEditedPercentage(e.target.value)}
              onKeyUp={handlePercentageChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={handleEditSubmit}>
              Submit
            </Button>
            <Button variant="contained" className="primary-btn" onClick={() => setShowEditPopup(false)}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* delete Activity percentage Modal */}
      <Dialog
        isOpen={showConfirmDeleteModal}
        onRequestClose={handleDeleteCancel}
        contentLabel="Confirmation Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <DialogActions  style={{background:themeMode==='dark' ? '#191f45' : "#fff"}}  className="modal-content flex-column">
          <Typography variant="h3">Confirmation</Typography>
          <Typography style={{color:themeMode==='dark' ? '#FFF6E0' : ""}} variant="body1">Are you sure you want to delete this activity percentage?</Typography>
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={handleDeleteConfirmAction}>
              Confirm
            </Button>
            <Button variant="contained" className="primary-btn" onClick={handleDeleteCancel}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default YourComponent;
