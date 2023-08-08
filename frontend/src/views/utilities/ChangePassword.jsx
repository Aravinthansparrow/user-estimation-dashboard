import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from '../../store/reducers/authReducer';
import { API_STATUS } from '../../utils/constants';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import passwordSchema from 'Joi Schemas/changePasswordSchema';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);
  const [userId, setUserId] = useState(null); // Local state for user ID
  const themeMode = useSelector((state) => state.customization.themeMode);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    // Get the user ID from localStorage and set it to the local state
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  // Use useEffect to handle the login status after password update
  useEffect(() => {
    if (loading === API_STATUS.FULFILLED) {
      console.log('Password updated successfully!');
      // Handle any post-update actions or navigation here
    }

    if (loading === API_STATUS.REJECTED) {
      console.log('Password update failed. Please try again.');
      // Handle any error notifications or user feedback here
    }
  }, [loading]);
  const handleChangePassword = () => {
    setError(null);
    // Validate the newPassword using Joi
    const { error: passwordError } = passwordSchema.validate(newPassword);

    if (passwordError) {
      setError(passwordError.details[0].message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    //display toast message
    toast.success('Password changed successfully', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true
    });

    dispatch(updatePassword({ userId, newPassword }));
    
    // Clear the input fields after password change
    setNewPassword('');
    setConfirmPassword('');
  };
 
  return (
    <MainCard style={{ height: '100%' }} className="" title="Change Password">
      <SubCard style={{ maxWidth: '500px', padding: '20px' }}>
        <Typography variant="h4" className="pwd-hint" color="error">
          Hint : Password should contain Numbers with Lower and Upper character
        </Typography>
        <Box>
          <TextField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            className="MuiFormControl-root label-title"
            InputProps={{
              endAdornment: (
                <>
                  <Box onClick={toggleShowPassword}>
                    {showPassword ? (
                      <VisibilityIcon 
                      style={{ color:themeMode === 'dark' ? '#fff' :'#5e35b1',cursor:"pointer" }} />
                    ) : (
                      <VisibilityOffIcon
                      style={{ color:themeMode === 'dark' ? '#fff' :'#5e35b1',cursor:"pointer" }} />
                    )}
                  </Box>
                </>
              )
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            className="MuiFormControl-root label-title"
            InputProps={{
              endAdornment: (
                <>
                  <Box onClick={toggleShowConfirmPassword}>
                    {showConfirmPassword ? (
                      <VisibilityIcon 
                      style={{ color:themeMode === 'dark' ? '#fff' :'#5e35b1',cursor:"pointer" }} />
                    ) : (
                      <VisibilityOffIcon 
                      style={{ color:themeMode === 'dark' ? '#fff' :'#5e35b1',cursor:"pointer" }} />
                    )}
                  </Box>
                </>
              )
            }}
          />
        </Box>

        {error && (
          <Box display="flex" gap="5px" color="error" alignItems="center">
            <ErrorOutlineIcon color="error" />
            <p style={{ color: 'red' }}>{error}</p>
          </Box>
        )}
        <Button className="primary-btn" style={{ marginTop: '13px' }} onClick={handleChangePassword} variant="contained">
          Submit
        </Button>
      </SubCard>
    </MainCard>
  );
};

export default ChangePassword;
