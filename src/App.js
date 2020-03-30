/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import Chart from 'chart.js';

import { Header } from './components';
import { REAL, Date } from './utils';

import './App.css';
import 'typeface-roboto';

import { useFileUpload } from './hooks'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const useStylesGrid = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const App = () => {
    const classes = useStyles();
    const classesGrid = useStylesGrid();
    const {
        customerName, operations, onChangeHandler,
        total, purchaseCost, profit, dividends, stocks, loadingFile
    } = useFileUpload();
    
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );
    }
    
    return (
        <div className="invest-root">
            <Header
                customerName={customerName}
                today={Date.TODAY}
            />
            
            <div>
                <input
                    onChange={onChangeHandler}
                    accept=".xls"
                    id="uploadCEI"
                    type="file"
                    className="display-none"
                />
                <label htmlFor="uploadCEI">
                    <Button variant="contained" color="primary" component="span">
                        Upload Arquivo CEI *.XLS
                    </Button>
                </label>
            </div>
            <br/>
            
            <Grid container spacing={3}>
                <Grid item xs>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Patrimônio
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {REAL(total)}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Custo de aquisição
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {REAL(purchaseCost)}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Proventos acumulados
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {REAL(dividends)}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className='card-total-typo' variant="h6" gutterBottom>
                                Lucro com operações
                            </Typography>
                            <Typography className='card-total-typo' variant="h3" gutterBottom>
                                <Box component="div">
                                    {REAL(profit)}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper>
                        <Card className={classes.root}>
                            <CardHeader title="Posição Atual"/>
                            <TableContainer component={Paper} className="auto-scroll">
                                <Table stickyHeader className={classes.table} size="small"
                                       aria-labelledby="Posição Atual">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Ativo</TableCell>
                                            <TableCell align="right">Preço</TableCell>
                                            <TableCell align="center">Qtde</TableCell>
                                            <TableCell align="right">P/M</TableCell>
                                            <TableCell align="right">Lucro</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stocks.map((operation, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{operation.ticket}</TableCell>
                                                <TableCell align="right">{REAL(operation.price,false)}</TableCell>
                                                <TableCell align="center">{operation.qtde}</TableCell>
                                                <TableCell align="right">{REAL(operation.averagePrice,false)}</TableCell>
                                                <TableCell align="right">{REAL(operation.profit,false)}</TableCell>
                                                <TableCell align="right">{REAL(operation.total,false)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper>
                        <Card className={classes.root}>
                            <CardHeader title="Operações"/>
                            <TableContainer component={Paper} className="auto-scroll">
                                <Table stickyHeader className={classes.table} size="small" aria-labelledby="Operações">
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
