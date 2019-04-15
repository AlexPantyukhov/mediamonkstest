import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  slot: {
    width: '125px',
    height: '125px',
    transition: '0.5s ease-out',
  },
});


const slot = props => {
  const images = require.context('../../assets/images/cropped', true);
  const { slot, handleMove, classes } = props;

  return (
    <Grid className={classes.slot} item onClick={() => handleMove(slot)}>
      {slot.img && <img src={images(`./${slot.img}`)} alt="slot"/>}
    </Grid>
  );
}

slot.propTypes = {
  slot: PropTypes.object.isRequired,
  handleMove: PropTypes.func.isRequired,
}

export default withStyles(styles)(slot);