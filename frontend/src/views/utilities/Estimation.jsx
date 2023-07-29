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
import { useNavigate, useLocation } from 'react-router-dom';
import { clientDetails, estimateListSelector } from '../../store/reducers/clientReducer';
import { API_STATUS } from '../../utils/constants';

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

  // const [showWorkItem, setShowWorkItem] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientId, setClientId] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const submittedParam = urlParams.get('submitted');

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
    if (submittedParam === 'true' && isFormSubmitted) {
      // Reset the submittedParam after showing the toast message
      urlParams.set('submitted', 'false');
    }
    // If the form is successfully submitted, navigate to the desired page
    if (clientdetails === API_STATUS.FULFILLED && isFormSubmitted) {
        setClientId(id);
        toast.success('Client Details Updated Successfully!', {
          autoClose: 2000,
        });
        navigate(`/utils/generate-estimation/${clientId}?submitted=true`);
    }

    if (clientdetails === API_STATUS.REJECTED && isFormSubmitted) {
      toast.error('Client submission failed');
      // Reset the isFormSubmitted
      setIsFormSubmitted(false);
    }

    return () => {
      // Clean up function to clear the "submitted" parameter when the component unmounts
      urlParams.delete('submitted');
    };
  }, [submittedParam, clientdetails, id, clientId, navigate, urlParams,isFormSubmitted]);

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
      // Dispatch the form submission
      dispatch(clientDetails({ formData }));
      // Set isSubmitted to true to trigger toast and navigation
      setIsFormSubmitted(true);
      
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
                            {isFormSubmitted && !errors.clientName && <CheckCircleIcon style={{ color: 'green' }} />}
                            {errors.clientName && <ErrorIcon color="error" />}
                          </InputAdornment>
                        )
                      }}
                      style={{ marginBottom: '10px', borderColor: isFormSubmitted && !errors.clientName ? 'green' : '' }}
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
                            {isFormSubmitted && !errors.clientAddress && <CheckCircleIcon style={{ color: 'green' }} />}
                            {errors.clientAddress && <ErrorIcon color="error" />}
                          </InputAdornment>
                        )
                      }}
                      style={{ marginBottom: '10px', borderColor: isFormSubmitted && !errors.clientAddress ? 'green' : '' }}
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
                            {isFormSubmitted && !errors.email && <CheckCircleIcon style={{ color: 'green' }} />}
                            {errors.email && <ErrorIcon color="error" />}
                          </InputAdornment>
                        )
                      }}
                      style={{ marginBottom: '10px', borderColor: isFormSubmitted && !errors.email ? 'green' : '' }}
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
    </MainCard>
  );
};

export default ClientForm;
