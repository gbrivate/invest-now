/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';
import { useCurrentPosition } from '../../hooks';
import { REAL } from '../../utils';

import {
    Paper,
    Card,
    CardHeader,
    TableCell,
    Table,
    TableHead,
    TableContainer,
    TableRow,
    TableBody,
} from '@material-ui/core';

export const CurrentPosition = props => {
    const {operations} = props;
    
    const {stocks} = useCurrentPosition(operations);
    
    return (
        <Paper>
            <Card>
                <CardHeader title="Posição Atual"/>
                <TableContainer component={Paper} className="auto-scroll">
                    <Table stickyHeader size="small"
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
                                    <TableCell align="right">{REAL(operation.price, false)}</TableCell>
                                    <TableCell align="center">{operation.qtde}</TableCell>
                                    <TableCell align="right">{REAL(operation.averagePrice, false)}</TableCell>
                                    <TableCell align="right">{REAL(operation.profit, false)}</TableCell>
                                    <TableCell align="right">{REAL(operation.total, false)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Paper>
    )
};