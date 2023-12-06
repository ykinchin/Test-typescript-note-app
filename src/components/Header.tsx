import { AppBar, Button, Link, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Header: FC = () => {
  return (
    <AppBar position="relative" color="primary" sx={{ mb: '2rem' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            to="/"
            color={'inherit'}
            underline="none"
          >
            Notes
          </Link>
        </Typography>
        <Button color="inherit" variant="outlined">
          <Link
            component={RouterLink}
            to="/create-note"
            color="inherit"
            underline="none"
          >
            Create Note
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
