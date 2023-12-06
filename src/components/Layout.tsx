import { Paper } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Paper
        elevation={5}
        sx={{ p: 3, minHeight: '80vh', boxSizing: 'border-box' }}
      >
        <Outlet />
      </Paper>
    </>
  );
};

export default Layout;
