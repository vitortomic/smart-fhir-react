import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({  
    topBar: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      zIndex: 2
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        padding: '23px'
    }
  }));

export const TopBar = () => {
    const classes = useStyles();
    return (
    <AppBar className={classes.topBar} position="static">
        <Typography className={classes.title}>Covid-19 Treatment Tracker</Typography>
    </AppBar>
  )

}
