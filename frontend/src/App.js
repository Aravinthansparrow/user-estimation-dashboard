import { useSelector } from 'react-redux';

// import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// routing
import ControlRoutes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <ControlRoutes />
          
        </NavigationScroll>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
