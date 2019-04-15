import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slot from '../../components/Slot';
import * as data from '../../mockup/data.json';
import imgMonk from '../../assets/images/monks.jpg'

const styles = theme => ({
  root: {
    width: '500px',
    height: '500px',
    backgroundColor: '#19673c'
  },
});

class Stage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slots: [],
      emptySlot: "33",
      completed: false,
    };
  }

  componentDidMount() {
    // build the initial puzzle then shuffles it
    let y = 0; let x = 0;
    const slots = data.cropped.map((img, i) => {
      if (i % 4 === 0 && i > 0) y++;                  
      x = i % 4 === 0 ? 0 : x+1;
      
      return { img, position: `${y}${x}`, correctPosition: `${y}${x}` };
    });

    this.setState({
      slots
    }, () => this.shuffle());
  }

  shuffle = () => {
    let y = 0; let x = 0;
    const slots = [...this.state.slots];
    slots
      .sort(() => Math.random() - 0.5 )
      .forEach((slot, i) => {
        if (i % 4 === 0 && i > 0) y++;                  
        x = i % 4 === 0 ? 0 : x+1;

        slot.position = `${y}${x}`;
    });
    
    let emptySlot;
    slots.forEach(slot => {
      if (!slot.img) emptySlot = slot.position
    });

    this.setState({ slots, emptySlot, completed: false });
  }  

  handleMove = (requestedSlot) => {
    const rest = parseInt(this.state.emptySlot) - parseInt(requestedSlot.position);
    
    // Checks if can move to next slot
    if (rest === 1 || rest === -1 || rest === 10 || rest === -10) {
      const slots = [...this.state.slots];

      const toMoveIndex = slots.findIndex(slot => slot.position === requestedSlot.position);
      const emptySlotIndex = slots.findIndex(slot => this.state.emptySlot === slot.position);
      
      slots[emptySlotIndex] = { ...slots[toMoveIndex], position: this.state.emptySlot };
      slots[toMoveIndex] = { ...this.state.slots[emptySlotIndex], position: requestedSlot.position };
      

      this.setState({
        slots,
        emptySlot: requestedSlot.position,
      }, () => this.isCompleted());
    }
  }

  isCompleted = () => {
    const missplacedSlot = this.state.slots.find(slot => slot.position !== slot.correctPosition);
    
    if (!missplacedSlot) {
      this.setState({ completed: true });
    }
  }

  render () {
    const { classes } = this.props;
        
    return (
      <Grid container justify="center">
        <Grid container justify="center"><Button onClick={this.shuffle}>shuffle!!</Button></Grid>
        <Grid container className={classes.root} spacing={0}>
          {!this.state.completed 
            ? this.state.slots.map((slot, i) => <Slot handleMove={this.handleMove} slot={slot} key={i}/>)
            : <img src={imgMonk} alt="media monks"/>
          }          
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Stage);