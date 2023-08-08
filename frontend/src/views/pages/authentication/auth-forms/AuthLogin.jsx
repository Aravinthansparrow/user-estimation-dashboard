import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { doLogin, loginSelector } from '../../../../store/reducers/authReducer';
import { API_STATUS } from '../../../../utils/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress
} from '@mui/material';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(loginSelector).loading;
  const themeMode = useSelector((state) => state.customization.themeMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    dispatch(doLogin({ email, password }));
    // After the API call, hide the circular progress
    setLoader(false);
  };

  useEffect(() => {
    console.log(loading, 'loading');
    if (loading === API_STATUS.FULFILLED) {
      console.log('Loggedin Successfully!');
      toast.dismiss();
      toast.success('Loggedin Successfully!', { autoClose: 3000 });
      setLoader(true);
      setTimeout(() => {
        navigate('/dashboard/default');
      }, 4000);
    }
    if (loading === API_STATUS.REJECTED) {
      console.log('Login Failed! Please check username and password');
      toast.dismiss();
      toast.error('Login Failed! Please check username and password', { autoClose: 4000 });
    }
  }, [loading, navigate]);

  return (
    <Box >
      <Box textAlign="center" marginBottom="10px">
        <AccountCircleIcon style={{ fontSize: '75', color:themeMode === 'dark' ? 'rgb(182 190 203)' : '#6d737c' }} />
      </Box>
      <form onSubmit={handleLogin}>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-login"
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            autoComplete="email"
          />
        </FormControl>

        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility style={{ color:themeMode === 'dark' ? theme.palette.primary.main : ''}} /> 
                  : <VisibilityOff style={{ color:themeMode === 'dark' ? theme.palette.primary.main : ''}}/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label={<span style={{ color:themeMode === 'dark' ? theme.palette.primary.main : theme.palette.common.black}}>Remember me</span>}
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack>
        {!loader && (
          <Box sx={{ mt: 2 }}>
            <Button fullWidth size="large" type="submit" variant="contained" style={{ color: 'white', background: theme.palette.primary.main }}>
              Sign in
            </Button>
          </Box>
        )}
      </form>
      {loader && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2}}>
          <Button fullWidth size="large" variant="contained" style={{ padding:'4px',background: 'rgb(195 203 203 / 49%)'}}>
          <CircularProgress /></Button>
        </Box>
      )}
    </Box>
  );
};

export default Login;
