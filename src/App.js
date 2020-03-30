/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';

import {
    CardContent,
    Typography,
    Box,
    Grid,
    Paper,
    Card,
    CardHeader,
    TableCell,
    Table,
    TableHead,
    TableContainer,
    TableRow,
    TableBody,
    Chip
} from '@material-ui/core';

import { Header } from './components';
import { CurrentPosition } from './components/CurrentPosition';
import { FileImport } from './components/FileImport';
import { REAL, Date } from './utils';

import './App.css';
import 'typeface-roboto';

import { useFileUpload } from './hooks'

const App = () => {
    const {customerName, operations, onChangeHandler} = useFileUpload();
    
    return (
        <div className="invest-root">
            <Header customerName={customerName} today={Date.TODAY}/>
            <FileImport onChangeHandler={onChangeHandler}/>
            
            <Grid container spacing={3}>
                <Grid item xs>
                    <Card>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Patrimônio
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {/*{REAL(total)}*/}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Custo de aquisição
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {/*{REAL(purchaseCost)}*/}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Proventos acumulados
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {/*{REAL(dividends)}*/}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Lucro com operações
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {/*{REAL(profit)}*/}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Grid container spacing={3}>
                <Grid item xs>
                    <CurrentPosition operations={operations}/>
                </Grid>
                <Grid item xs>
                    <Paper>
                        <Card>
                            <CardHeader title="Operações"/>
                            <TableContainer component={Paper} className="auto-scroll">
                                <Table stickyHeader size="small" aria-labelledby="Operações">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Data</TableCell>
                                            <TableCell>Ativo</TableCell>
                                            <TableCell align="center">Operação</TableCell>
                                            <TableCell align="center">Quantidade</TableCell>
                                            <TableCell align="right">Preço</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {operations.map((operation, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{operation.data.toLocaleString()}</TableCell>
                                                <TableCell component="th" scope="row">{operation.ticket}</TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        className={operation.operacao === 'C' ? 'chip-buy' : 'chip-sell'}
                                                        label={operation.operacao === 'C' ? 'Compra' : 'Venda'}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    className={operation.qtde >= 100 ? 'chip-bigger-100' : ''}
                                                    align="center">
                                                    {operation.qtde}
                                                </TableCell>
                                                <TableCell align="right">{REAL(operation.price, false)}</TableCell>
                                                <TableCell align="right">{REAL(operation.total)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    
                    
                    </Paper>
                </Grid>
            </Grid>
            {/*<canvas id="myChart" width="400" height="400"></canvas>*/}
            
            {/*{operations.map((operation, index) => {*/}
            {/*    return (*/}
            {/*        <div key={index} className={operation.isFII ? 'is-fii' : ''}>*/}
            {/*            {operation.data.toLocaleString()} {operation.ticket} {operation.operacao} {operation.ticket} {operation.qtde} {operation.price} {operation.total}*/}
            {/*        </div>*/}
            {/*    */}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
};

export default App;
