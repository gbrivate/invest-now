/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

import { REAL } from '../../utils';

export const Totals = props => {
    const {total, purchaseCost, dividends, profit} = props;
    
    return (
        <Grid container spacing={3}>
            <Grid item xs>
                <Card className="min-card">
                    <CardContent>
                        <Typography className='card-total-typo' variant="h6" gutterBottom>
                            Rentabilidade
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
                <Card className="min-card">
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
                <Card className="min-card">
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
                <Card className="min-card">
                    <CardContent>
                        <Typography className='card-total-typo' variant="h6" gutterBottom>
                            Proventos
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
                <Card className="min-card">
                    <CardContent>
                        <Typography className='card-total-typo' variant="h6" gutterBottom>
                            Lucro
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
    )
};