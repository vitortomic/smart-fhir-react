import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({  
    container: {
        width: '100%',
        height: '100%',
        background: 'white',
        position: 'fixed',
        zIndex: '1'
    },
    spinner: {
        position: 'absolute',
        top: '35%',
        left: '45%'
    }
  }));

export const Spinner = () => {
    const classes = useStyles();
    return (
    <div className={classes.container}>
        <CircularProgress size={80} color="primary" className={classes.spinner} />
    </div>
  )

}