/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import React from 'react';
import { firstWordFromAText } from '../../utils';

export const Header = props => {
    const {customerName, today} = props;
    const firstName = firstWordFromAText(customerName);
    
    return (
        <header className="App-header">
            <h3 className="welcome-title">Bem vindo
                {firstName && <span className="capitalize">, {firstName} </span>}
                <span className="today capitalize"> {today}</span>
            </h3>
            <hr className="divider"/>
            <h3 className="welcome-title">Visão Geral das Finanças</h3>
        </header>
    )
};