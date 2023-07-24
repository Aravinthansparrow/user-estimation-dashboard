import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../store/reducers/authReducer'; // Update the path
import { API_STATUS } from '../../../src/utils/constants';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, errorMessage } = useSelector((state) => state.login);
  const [userId, setUserId] = useState(null); // Local state for user ID

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
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    dispatch(updatePassword({ userId, newPassword }));
  };

  return (
    <MainCard style={{ height: '100%' }} className="" title="Change Password">
      <SubCard>
      <Typography variant='h4' className="pwd-hint" color="error">Hint : Password should contain Numbers with Lower and Upper character</Typography>
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
                  <Button onClick={toggleShowPassword} className="visibility-button">
                    {showPassword ? (
                      <VisibilityIcon style={{ color: 'rgb(37, 167, 170)' }} />
                    ) : (
                      <VisibilityOffIcon style={{ color: 'rgb(37, 167, 170)' }} />
                    )}
                  </Button>
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
                  <Button onClick={toggleShowConfirmPassword} className="visibility-button">
                    {showConfirmPassword ? (
                      <VisibilityIcon style={{ color: 'rgb(37, 167, 170)' }} />
                    ) : (
                      <VisibilityOffIcon style={{ color: 'rgb(37, 167, 170)' }} />
                    )}
                  </Button>
                </>
              )
            }}
          />
        </Box>

        {error && <p>{error}</p>}
        <Button className="buttonBox" onClick={handleChangePassword} variant="contained">
          Submit
        </Button>
        {/* Optionally display a loading indicator or error message */}
        {loading === API_STATUS.PENDING && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </SubCard>
    </MainCard>
  );
};

export default ChangePassword;
