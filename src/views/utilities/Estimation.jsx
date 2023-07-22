import React, { useState,useEffect } from 'react';
import Joi from 'joi';
import { Grid, Button, TextField, Box, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { clientDetails,estimateListSelector } from '../../store/reducers/clientReducer';
import { API_STATUS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.username);
  const clientdetails = useSelector(estimateListSelector).submitclients
  const id = useSelector(estimateListSelector).id
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientAddress: '',
    email: '',
    createdBy: username,
  });

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [errors, setErrors] = useState({
    clientName: '',
    clientAddress: '',
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Joi.object({
    clientName: Joi.string().required().label('client name'),
    clientAddress: Joi.string().required().label('Client Address'),
    email: Joi.string()
      .email({ tlds: { allow: false } }) // Disable Joi's TLD validation
      .required()
      .label('Email ID')
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmailFormat = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    console.log(clientdetails, clientdetails);
    if (clientdetails === API_STATUS.FULFILLED) {
      console.log('client submission successful');
      console.log(id);
      setClientId(id);

      // Show the popup

      // Reset the form after submission
    }
    if (clientdetails === API_STATUS.REJECTED) {
      console.log('client submission failed');
    }
  }, [clientdetails]);

  const handlePopupClose = () => {
    // Hide the popup
    setShowPopup(false);
    // Show the WorkItem component
    setFormData({
      clientName: '',
      clientAddress: '',
      email: '',
      createdBy: ''
      
      
    });
    navigate(`/generate-estimation/${clientId}`)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    dispatch(clientDetails({ formData }));
    setShowPopup(true);
    // Check for empty fields and mark them as errors
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field].trim() === '') {
        newErrors[field] = `Please provide a valid ${field}`;
      }
    });
    setErrors(newErrors);

    // Validate email format using regex
    if (formData.email.trim() !== '' && !validateEmailFormat(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please provide a valid Email ID'
      }));
      return;
    }

    // Validate the form with Joi
    const validation = schema.validate(formData, { abortEarly: false, allowUnknown: true });
    if (validation.error) {
      validation.error.details.forEach((detail) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [detail.context.label]: detail.message
        }));
      });
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <MainCard style={{ height: '100%' }} title="Generate Estimation">
      <Grid style={{ maxWidth: '550px', margin: 'auto' }} item xs={12} sm={6}>
        <SubCard>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <div>
                <span style={{ display: 'block', marginBottom: '10px' }}>Client Name</span>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  error={!!errors.clientName}
                  helperText={errors.clientName}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isSubmitted && !errors.clientName && <CheckCircleIcon style={{ color: 'green' }} />}
                        {errors.clientName && <ErrorIcon color="error" />}
                      </InputAdornment>
                    )
                  }}
                  style={{ marginBottom: '10px', borderColor: isSubmitted && !errors.clientName ? 'green' : '' }}
                />
              </div>
              <div>
                <span style={{ display: 'block', marginBottom: '10px' }}>Client Address</span>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  error={!!errors.clientAddress}
                  helperText={errors.clientAddress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isSubmitted && !errors.clientAddress && <CheckCircleIcon style={{ color: 'green' }} />}
                        {errors.clientAddress && <ErrorIcon color="error" />}
                      </InputAdornment>
                    )
                  }}
                  style={{ marginBottom: '10px', borderColor: isSubmitted && !errors.clientAddress ? 'green' : '' }}
                />
              </div>
              <div>
                <span style={{ display: 'block', marginBottom: '10px' }}>Email ID</span>
                <TextField
                  type="email"
                  fullWidth
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isSubmitted && !errors.email && <CheckCircleIcon style={{ color: 'green' }} />}
                        {errors.email && <ErrorIcon color="error" />}
                      </InputAdornment>
                    )
                  }}
                  style={{ marginBottom: '10px', borderColor: isSubmitted && !errors.email ? 'green' : '' }}
                />
              </div>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{ color: 'white', background: 'rgb(0, 168, 171)', borderRadius: '20px' }}
                >
                  Save
                </Button>
              </Box>
            </FormControl>
          </form>

        </SubCard>
      </Grid>
      {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>Client Details Updated</p>
                <button className="popup-button" onClick={handlePopupClose}>OK</button>
              </div>
            </div>
      )}
    </MainCard>
  );
};

export default ClientForm;
