import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const Left = ({ styles }) => {
  console.log(styles);
  return (
    <>
      <Paper className={styles}>Left Pa!</Paper>
    </>
  );
};

export default Left;
