import React from 'react';
import { Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const themeMode = useSelector((state) => state.customization.themeMode);
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center"  mt={2}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : '' }}
        onClick={handlePreviousPage}
      >
        Previous
      </Button>
      <Box mx={2} style={{color:themeMode==='dark' ? '#fff' : "black"}}>
        Page {currentPage} of {totalPages}
      </Box>
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
