import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGeneralSettings, updateGeneralSettings } from '../../store/reducers/generalReducer';
import { API_STATUS } from '../../utils/constants';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import {
  Dialog,
  Typography,
  DialogActions,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  TextField
} from '@mui/material';

const GeneralSettings = () => {
  const [modal, setModal] = useState(false);
  const [tempValues, setTempValues] = useState({});

  const generalSettings = useSelector((state) => state.generalSetting.data);
  const generalSettingsStatus = useSelector((state) => state.generalSetting.status);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch general settings data if it's still pending
    if (generalSettingsStatus === API_STATUS.PENDING) {
      dispatch(fetchGeneralSettings());
    } else if (generalSettingsStatus === API_STATUS.REJECTED) {
      console.log('data failed');
    }
  }, [dispatch, generalSettingsStatus]);

  useEffect(() => {
    // Update the tempValues state whenever generalSettings is updated
    setTempValues(generalSettings);
  }, [generalSettings]);

  const handleUpdate = () => {
    setModal(true);
    setTempValues(generalSettings);
  };

  const handleClose = () => {
    setModal(false);
    setTempValues({});
  };

  const handleChange = (e) => {
    setTempValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedValues = { ...tempValues };
    console.log(updatedValues);
    dispatch(updateGeneralSettings(updatedValues))
      .unwrap()
      .then(() => {
        // The Redux store will automatically update with the new values
        setModal(false);
      });
  };

  return (
    <MainCard style={{ height: '100%' }} title="General Settings">
      <SubCard style={{ maxWidth: '500px' }}>
        <TableContainer component={Paper}>
          <Table className="work-item-table">
            <TableBody>
              <TableRow className="workitem-tab">
                <TableCell>Version</TableCell>
                <TableCell>
                  <TextField  value={generalSettings.version || ''} readOnly />
                </TableCell>
              </TableRow>
              <TableRow className="workitem-tab">
                <TableCell>Document Version</TableCell>
                <TableCell>
                  <TextField value={generalSettings.document_version || ''} readOnly />
                </TableCell>
              </TableRow>
              <TableRow className="workitem-tab">
                <TableCell>Hours per Story Point</TableCell>
                <TableCell>
                  <TextField  value={generalSettings.hours_per_story_point || ''} readOnly />
                </TableCell>
              </TableRow>
              <TableRow className="workitem-tab">
                <TableCell>Rate per Hour</TableCell>
                <TableCell>
                  <TextField value={generalSettings.rate_per_hour || ''} readOnly />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button className="primary-btn mt-15" variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </SubCard>
      {modal && (
        <Dialog overlayClassName="modal-overlay" open={modal} >
          <div className='modal'>
          <Typography variant="h3" className="confirm-header">
            Update General Settings
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className='text-box'>
              <Typography className='min-w-155' variant="body1">Version:</Typography>
              <TextField name="version" type='number' value={tempValues.version || ''} onChange={handleChange} />
            </div>
            <div className='text-box'>
              <Typography className='min-w-155' variant="body1">Document Version:</Typography>
              <TextField name="document_version" type='number' value={tempValues.document_version || ''} onChange={handleChange} />
            </div>
            <div className='text-box'>
              <Typography className='min-w-155' variant="body1">Hours per Story Point:</Typography>
              <TextField name="hours_per_story_point" type='number' value={tempValues.hours_per_story_point || ''} onChange={handleChange} />
            </div>
            <div className='text-box'>
              <Typography className='min-w-155' variant="body1">Rate per Hour:</Typography>
              <TextField name="rate_per_hour" type='number' value={tempValues.rate_per_hour || ''} onChange={handleChange} />
            </div>
            <DialogActions>
              <Button variant="contained" type='submit' className="primary-btn">
                Submit
              </Button>
              <Button variant="contained" onClick={handleClose}  className="primary-btn">
                {' '}
                
                Cancel
              </Button>
            </DialogActions>
          </form>
          </div>
        </Dialog>
      )}
    </MainCard>
  );
};

export default GeneralSettings;
