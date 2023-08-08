import React from 'react';
import { IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { toggleThemeMode } from '../../store/actions';
import SubCard from 'ui-component/cards/SubCard';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const themeMode = useSelector((state) => state.customization.themeMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleThemeMode('dark'));
  };

  const handleToggleLightMode = () => {
    dispatch(toggleThemeMode('light'));
  };

  return (
    <div style={{marginBottom:'22px'}}>
      <Typography variant="h4" mb={1}>Theme Mode</Typography>
      <Box display="flex" gap="14px" width="100%">
        <SubCard style={{ width: '100%',display:'flex',justifyContent:'center' }}>
          <IconButton onClick={handleToggleDarkMode} color="inherit">
            <Brightness4Icon style={{color:themeMode==='dark' ? theme.palette.background.paper :theme.palette.common.black }} />
          </IconButton>
        </SubCard>
        <SubCard style={{ width: '100%',display:'flex',justifyContent:'center' }}>
          <IconButton onClick={handleToggleLightMode} color="inherit">
            <Brightness7Icon style={{color:themeMode==='dark' ? theme.palette.background.paper :theme.palette.common.black }} />
          </IconButton>
        </SubCard>
      </Box>
    </div>
  );
};

export default DarkModeToggle;
