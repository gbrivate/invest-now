/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { Grid } from '@material-ui/core';
import React from 'react';

import { Header, CurrentPosition, Totals, Operations } from './components';

import './App.css';
// import 'typeface-roboto';

import { useFileUpload } from './hooks'

export const App = () => {
    const {customerName, operations, onChangeHandler} = useFileUpload();
    
    return (
        <div className="invest-root">
            <Header customerName={customerName} onChangeHandler={onChangeHandler}/>
            <Totals/>
            <Grid container spacing={3}>
                <CurrentPosition operations={operations}/>
                <Operations operations={operations}/>
            </Grid>
            {/*<canvas id="myChart" width="400" height="400"></canvas>*/}
        </div>
    );
};
