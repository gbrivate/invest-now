/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import { firstWordFromAText, Date } from '../../utils';
import { FileImport } from '../FileImport';

export const Header = props => {
    const {customerName, onChangeHandler} = props;
    const firstName = firstWordFromAText(customerName);
    
    return (
        <header className="App-header">
            <Grid container justify="center" spacing={2}>
                <Grid item xs={6}>
                    <h3 className="welcome-title">Bem vindo,
                        {firstName && <span className="capitalize"> {firstName} </span>}
                        <p className="today capitalize"> {Date.TODAY}</p>
                    </h3>
                </Grid>
                <Grid item xs={6}>
                    <FileImport onChangeHandler={onChangeHandler}/>
                </Grid>
            </Grid>
            <hr className="divider"/>
            <h3 className="welcome-title">Visão Geral das Finanças</h3>
        </header>
    )
};