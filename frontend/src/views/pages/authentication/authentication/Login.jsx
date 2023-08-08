import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';

// project imports
import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';

// assets

// ================================|| AUTH - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const themeMode = useSelector((state) => state.customization.themeMode);
  return (
    <AuthWrapper style={{background:themeMode === 'dark' ? '#060a23' : ''}} >
      <Grid  container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid  item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 0px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper style={{background:themeMode === 'dark' ? theme.palette.darkbg.blue1 : ''}}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 0 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
