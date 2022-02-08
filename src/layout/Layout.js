import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    padding: 32,
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      {/* main content */}
      <div className={classes.page}>
        { children }
      </div>
    </div>
  );
};

export default Layout;