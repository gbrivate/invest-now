/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import currency from 'currency.js';

export const REAL = (value, isFormat = true) => currency(value, {
    symbol: 'R$',
    decimal: ',',
    separator: '.',
    pattern: `! #`,
}).format(isFormat);

export const USD = (value, isFormat = true) => currency(value, {}).format(isFormat);