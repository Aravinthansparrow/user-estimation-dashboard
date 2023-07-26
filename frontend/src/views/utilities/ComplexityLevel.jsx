import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Dialog from 'react-modal';
import { Box, Typography, DialogActions } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useSelector, useDispatch } from 'react-redux';
import { complexitySelector, fetchComplexity, submitComplexity } from '../..//store/reducers/complexityReducer';
import { API_STATUS } from '../../utils/constants';

function Complexity() {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedDays, setSelectedDays] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [complexityId, setComplexityId] = useState('');
  const complexityloading = useSelector(complexitySelector).complexityloading;
  const complexityData = useSelector(complexitySelector).loadData;
  const updatecomplexityloading = useSelector(complexitySelector).submitcomplexityloading;
  const [defaultValues, setDefaultValues] = useState({
    complexity: '',
    days: 1
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComplexity());
  }, [dispatch]);

  useEffect(() => {
    console.log(complexityData);

    console.log(complexityloading, 'loading');
    if (complexityloading === API_STATUS.FULFILLED) {
      console.log('data got Successfully!');
      console.log(complexityData[0].complexity);

      setDefaultValues(complexityData);
      setSelectedValue(complexityData[0].complexity);
      console.log(selectedDays);
      console.log(selectedValue);
      setSelectedDays(complexityData[0].days);
      setComplexityId(complexityData[0].id);
    }
    if (complexityloading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [complexityloading]);

  const handleComplexitySelect = (event) => {
    const selectedComplexity = event.target.value;
    setSelectedValue(selectedComplexity);

    // Automatically set the number of days based on the selected complexity
    switch (selectedComplexity) {
      case 'Simple':
        setSelectedDays(1);
        break;
      case 'Medium':
        setSelectedDays(2);
        break;
      case 'Complex':
        setSelectedDays(3);
        break;
      default:
        setSelectedDays(1);
        break;
    }
  };

  const handleDaysSelect = (event) => {
    const selectedNumDays = event.target.value;
    setSelectedDays(selectedNumDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const complexity = selectedValue;
    const days = selectedDays;
    dispatch(submitComplexity({ complexityId, complexity, days }));
  };

  useEffect(() => {
    console.log(updatecomplexityloading, 'updatecomplexityloading');
    if (updatecomplexityloading === API_STATUS.FULFILLED) {
      console.log('complexity updated Successfully!');
      setShowPopup(true);
    }
    if (updatecomplexityloading === API_STATUS.REJECTED) {
      console.log('complexity update got failed');
    }
  }, [updatecomplexityloading]);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <MainCard style={{ height: '100%' }} className="" title="Set Complexity Level">
      <SubCard style={{ maxWidth: '500px', padding: '20px' }}>
        <Box display="flex" flexDirection="column" gap="5px" color="error">
          <FormControl className="form-control">
            <InputLabel id="complexity-select-label">Select Complexity</InputLabel>
            <Select id="complexity-select" value={selectedValue} onChange={handleComplexitySelect}>
              {defaultValues.complexity && <MenuItem value={defaultValues.complexity}>{defaultValues.complexity}</MenuItem>}
              <MenuItem value="Simple">Simple</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Complex">Complex</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="form-control">
            <InputLabel id="days-select-label">Number of Days</InputLabel>
            <Select id="days-select" value={selectedDays} onChange={handleDaysSelect}>
              {defaultValues.days && <MenuItem value={defaultValues.days}>{defaultValues.days}</MenuItem>}
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>

          <Button className="primary-btn" variant="contained" color="primary" size="large" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
        <Dialog
          isOpen={showPopup}
          onRequestClose={handlePopupClose}
          contentLabel="Complexity Level Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <DialogActions className="modal-content flex-column gap-0">
            <Typography variant="h3" className="confirm-header">
              Confirmation
            </Typography>
            <Box display="flex" width="100%" alignItems="center">
              <Typography variant="body1" className="confirm-para">
                Complexity:
              </Typography>{' '}
              <p className='content-para'>{selectedValue} </p>
            </Box>
            <Box display="flex" ml={0} alignItems="center" width="100%" justifyContent='space-between'>
              <Typography variant="body1" className="confirm-para">
                Number of Days:
              </Typography>{' '}
              <p className='content-para'>{selectedDays} </p>
            </Box>
            <DialogActions>
              <Button variant="contained" className="primary-btn" onClick={handlePopupClose}>
                Close
              </Button>
            </DialogActions>
          </DialogActions>
        </Dialog>
      </SubCard>
    </MainCard>
  );
}

export default Complexity;
