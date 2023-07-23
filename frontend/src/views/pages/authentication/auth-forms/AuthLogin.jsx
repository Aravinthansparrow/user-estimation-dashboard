import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
// import Joi from 'joi';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import {
  doLogin,
  loginSelector,
} from "../../../../store/reducers/authReducer";
import { API_STATUS } from "../../../../utils/constants";

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
  Typography
} from '@mui/material';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// ============================|| FIREBASE - LOGIN ||============================ //

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const loading  = useSelector(loginSelector).loading;
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
  // Define the Joi schema for validation
  // const schema = Joi.object({
  //   email: Joi.string().email({ tlds: false }).required(),
  //   password: Joi.string()
  //     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
  //     .required()
  //     .messages({
  //       'string.pattern.base': 'Password should be alphanumeric, case-sensitive, and contain at least 1 special character.'
  //     })
  // });
  const handleLogin =  (e) => {
    e.preventDefault();
    
    dispatch(doLogin({email, password}))
  };
  useEffect(() => {
    console.log(loading, "loading")
    if (loading === API_STATUS.FULFILLED) {
      
      console.log("Loggedin Successfully!");
      navigate('/dashboard/default');
    }
    if (loading === API_STATUS.REJECTED) {
      
      console.log('Login Failed! Please check username and password');
    }
  }, [loading]);
  return (
    <div>
      <div style={{ textAlign:"center",marginBottom:"10px" }}>
      <AccountCircleIcon  style={{ fontSize:"75",color:"#6d737c" }}/>
    </div>
      <form onSubmit={handleLogin} >
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
            inputProps={{}}
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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
        </FormControl>
        {/* {error && (
            <Box
              sx={{
                color: "red",
                display: "flex",
                alignItems: "center",
                fontWeight: "normal",
                my: 2,
                width: "100%",
              }}
            >
              <ErrorIcon sx={{ mr: 1 }} />
              <span>{error}</span>
            </Box>
          )} */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Remember me"
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack>
        <Box sx={{ mt: 2 }}>
          
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ color: 'white', background: 'rgb(0, 168, 171)' }}
            >
              Sign in
            </Button>
          
        </Box>
      </form>
    </div>
  );
};

export default Login;
