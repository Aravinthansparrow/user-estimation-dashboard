import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { Grid, Button, TextField, Box, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clientDetails, estimateListSelector } from '../../store/reducers/clientReducer';
import { API_STATUS } from '../../utils/constants';
import WorkItem from '../utilities/WorkItemTable';


const ClientForm = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.username);
  const clientdetails = useSelector(estimateListSelector).submitclients;
  const id = useSelector(estimateListSelector).id;

  const [formData, setFormData] = useState({
    clientName: '',
    clientAddress: '',
    email: '',
    createdBy: username
  });
  const [errors, setErrors] = useState({
    clientName: '',
    clientAddress: '',
    email: ''
  });

  const [showWorkItem, setShowWorkItem] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientId, setClientId] = useState(null);
  const navigate = useNavigate();

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

  const handleNavigation = () => {
    if (clientId !== null) {
      setShowWorkItem(true);
      navigate(`/utils/generate-estimation/${clientId}`);
    }
  };

  useEffect(() => {
    if (clientdetails === API_STATUS.FULFILLED) {
      setClientId(id);

      // Show success toast when clientId is updated
      toast.success('Client Details Updated Successfully !', {
        autoClose: 5000, // 6 seconds
      });
    }
    if (clientdetails === API_STATUS.REJECTED) {
      toast.error('Client submission failed');
    }
  }, [clientdetails, id]);

  // Call the handleNavigation function with a time delay after clientId is updated
  useEffect(() => {
    if (clientId !== null) {
      const timer = setTimeout(handleNavigation, 2000); // Adjust the time delay as per your requirement

      // Clear the timer if the component unmounts before the time delay is reached
      return () => clearTimeout(timer);
    }
  }, [clientId]);
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);
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
      dispatch(clientDetails({ formData }));
    }
  };

  return (
    <MainCard style={{ height: '100%' }} title="Generate Estimation">
      <Grid style={{ maxWidth: '550px', margin: '30px auto' }} item xs={12} sm={6}>
        <div style={{ height: '100%' }} title="Generate Estimation">
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
        </div>
      </Grid>
      
      {showWorkItem && clientId && <WorkItem clientId={clientId} />}
    </MainCard>
  );
};

export default ClientForm;
