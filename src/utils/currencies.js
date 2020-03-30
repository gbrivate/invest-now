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
export const CURRENCY = (value) => currency(value);
export const USD = (value, isFormat = true) => currency(value, {}).format(isFormat);
export const SUM = (value1, value2) => currency(value1).add(value2);
export const DIVIDER = (value1, value2) => currency(value1).subtract(value2);