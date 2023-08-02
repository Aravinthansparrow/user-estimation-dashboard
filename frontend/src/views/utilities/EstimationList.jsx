import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCreated, setApproved, setUnApproved, setRejected } from '../../store/reducers/clientReducer';
import '../../../src/assets/scss/style.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { fetchEstimateList, changeStatus, estimateListSelector } from '../../store/reducers/clientReducer';
import { API_STATUS } from '../../utils/constants';
import { Box, Button, TextField, DialogActions, Typography, Paper } from '@mui/material';
import Pagination from 'ui-component/pagination/pagination';
import MainCard from 'ui-component/cards/MainCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // Import the relativeTime plugin
import 'dayjs/locale/en';
const EstimateList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showEstimateSummary, setShowEstimateSummary] = useState(false);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByClientName, setFilterByClientName] = useState('');
  const [filterByEstimatedBy, setFilterByEstimatedBy] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const loading = useSelector(estimateListSelector).loading;
  const changestatus = useSelector(estimateListSelector).changestatus;
  const data = useSelector(estimateListSelector).loadData;
  dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin
  dayjs.locale('en');
  // Add pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredClients.length / itemsPerPage);

  // Calculate the serial number for each client
  const calculateSerialNumber = (index) => {
    return (page - 1) * itemsPerPage + index + 1;
  };

  // Update filteredClients to show only the data for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Dispatch the actions to update the 'created' and 'approved' values in the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [clients, filterByDate, filterByClientName, filterByEstimatedBy, filterByStatus]);

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
      setFilteredClients(data);
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [loading]);

  const handleView = (clientId) => {
    setSelectedClientId(clientId);
    setShowEstimateSummary(true);
    setShowFilters(false);
    navigate(`/utils/estimate-summary/${clientId}`);
  };

  const handleBack = () => {
    setShowEstimateSummary(false);
    setShowFilters(true);
  };

  const applyFilters = () => {
    let filteredData = clients;
    if (filterByDate) {
      filteredData = filteredData.filter((client) => client.createdAt.substring(0, 10).includes(filterByDate));
    }
    if (filterByClientName) {
      filteredData = filteredData.filter((client) => client.clientName.toLowerCase().includes(filterByClientName.toLowerCase()));
    }
    if (filterByEstimatedBy) {
      filteredData = filteredData.filter((client) => client.createdBy.toLowerCase().includes(filterByEstimatedBy.toLowerCase()));
    }

    if (filterByStatus) {
      filteredData = filteredData.filter((client) => client.status.toLowerCase().includes(filterByStatus.toLowerCase()));
    }
    setFilteredClients(filteredData);
  };

  const handleStatusUpdate = (clientId, status) => {
    setSelectedClientId(clientId);
    setConfirmationAction(status);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = () => {
    dispatch(changeStatus({ selectedClientId, confirmationAction }));
  };

  useEffect(() => {
    console.log(changestatus, 'changestatus');
    if (changestatus === API_STATUS.FULFILLED) {
      console.log('status changed Successfully!');
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClientId) {
          return { ...client, status: confirmationAction };
        }
        return client;
      });

      const updatedFilteredClients = filteredClients.map((client) => {
        if (client.id === selectedClientId) {
          return { ...client, status: confirmationAction };
        }
        return client;
      });

      setClients(updatedClients);
      setFilteredClients(updatedFilteredClients);
      setShowConfirmationModal(false);
    }
    if (changestatus === API_STATUS.REJECTED) {
      console.log('status change failed');
    }
  }, [changestatus]);

  return (
    <MainCard style={{ height: '100%' }} title="Estimation List">
        {showFilters && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              className="input-list"
              label="Filter by date"
              value={filterByDate}
              onChange={(e) => setFilterByDate(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              className="input-list"
              label="Filter by client name"
              value={filterByClientName}
              onChange={(e) => setFilterByClientName(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              className="input-list"
              size="small"
              label="Filter by estimated by"
              value={filterByEstimatedBy}
              onChange={(e) => setFilterByEstimatedBy(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              className="input-list"
              label="Filter by status"
              value={filterByStatus}
              onChange={(e) => setFilterByStatus(e.target.value)}
            />
            <Button
              variant="contained"
              className="input-list secondary-btn"
              color="primary"
              onClick={applyFilters}
              style={{ borderRadius: '20px', textTransform: 'none' }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div>
        )}
        <div>
          <div className="list-headers">
            <div className="head-serial mr-14">S.No</div>
            <div className="head-date">Date</div>
            <div className="head-name">Client Name</div>
            <div className="head-by">Estimated By</div>
            <div className="head-status">Status</div>
            <div className="head-action">Actions</div>
            <div className="head-view text-center">View</div>
          </div>

          <div className="list-tabs">
            {currentClients.map((client, index) => {
              return (
                <Paper key={client.id} elevation={3} className="field-set">
                  <Typography variant="body1" className="head-serial index-num">
                    {calculateSerialNumber(index)}
                  </Typography>
                  <Typography variant="body1" className="head-date">
                  {dayjs(client.createdAt).format('DD-MM-YYYY')}
                  </Typography>
                  <Typography variant="body1" className="head-name">
                    {client.clientName}
                  </Typography>
                  <Typography variant="body1" className="head-by">
                    {client.createdBy}
                  </Typography>
                  <Typography variant="body1" className="head-status">
                    {client.status}
                  </Typography>
                  <div className="head-action">
                    {client.status === 'approved' ? (
                      <Button variant="outlined" className="disable-app" disabled>
                        Accepted
                      </Button>
                    ) : client.status === 'rejected' ? (
                      <Button variant="outlined" className="disable-rej" disabled>
                        Rejected
                      </Button>
                    ) : (
                      <>
                        <Button variant="contained" className="app-btn" onClick={() => handleStatusUpdate(client.id, 'approved')}>
                          Accept
                        </Button>
                        <Button variant="contained" className="rej-btn" onClick={() => handleStatusUpdate(client.id, 'rejected')}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="head-view align-l-p">
                    <Button variant="outlined" className="view-btn" onClick={() => handleView(client.id)}>
                      <VisibilityIcon />
                    </Button>
                  </div>
                </Paper>
              );
            })}
          </div>
        </div>
      {/* Pagination component */}
      <Box  display="flex" justifyContent="end" alignItems="center">
        <Pagination currentPage={page} totalPages={pageCount} onPageChange={handlePageChange} />
      </Box>
      {showEstimateSummary && (
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
        </Box>
      )}

      <Modal
        className="modal modal-content"
        overlayClassName="modal-overlay"
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <Typography variant="h3" className="confirm-header">
          Confirmation
        </Typography>
        <Typography variant="body1" className="confirm-para">
          Are you sure you want to {confirmationAction === 'approved' ? 'approve' : 'reject'} this estimate?
        </Typography>
        <DialogActions>
          <Button variant="contained" className="primary-btn" onClick={() => handleConfirmation(selectedClientId)}>
            Confirm
          </Button>
          <Button variant="contained" className="primary-btn" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Modal>
    </MainCard>
  );
};

export default EstimateList;
