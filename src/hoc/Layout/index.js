import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: '#c5c5c5',
    height: '100%',
  }
});

const layout = props => {
  const { children, classes } = props;
  return (
    <Grid container justify="center" alignContent="center" className={classes.root}>{children}</Grid>
  );
}

layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(layout);