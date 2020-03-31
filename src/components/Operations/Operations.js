/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';

import {
    Card,
    CardHeader, Chip,
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from '@material-ui/core';

import { REAL } from '../../utils';

export const Operations = props => {
    const {operations} = props;
    return (
        <Grid item xs>
            <Paper>
                <Card>
                    <CardHeader className="title-table" title="Operações"/>
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
    )
};