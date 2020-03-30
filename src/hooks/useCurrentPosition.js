/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { useEffect, useState } from 'react';

export const useCurrentPosition = operations => {
    const [stocks, setStocks] = useState([]);
    
    // Consolidate the stocks, profit, quantity etc.
    useEffect(() => {
        let stocksOperation = [];
        operations.forEach(operation => {
            let index = null;
            let stock = stocksOperation.find((s, i) => {
                index = i;
                return s.ticket === operation.ticket
            });
            if (stock) {
                if (operation.operacao === 'C') {
                    stock.qtde += operation.qtde;
                    stock.total = Math.round((stock.total + operation.total) * 100) / 100;
                    stock.averagePrice = stock.total / stock.qtde;
                } else {
                    if (stock.averagePrice) {
                        const spread = operation.price - stock.averagePrice;
                        const profit = spread * operation.qtde;
                        if (!stock.profit) stock.profit = 0;
                        stock.profit += profit;
                    }
                    
                    stock.qtde -= operation.qtde;
                    if (stock.qtde === 0) {
                        stocksOperation.splice(index, 1);
                        stock.profit = 0;
                    } else {
                        stock.total = Math.round((stock.total - operation.total) * 100) / 100;
                        stock.averagePrice = stock.total / stock.qtde;
                    }
                }
            } else {
                operation.averagePrice = operation.total / operation.qtde;
                stocksOperation.push(Object.assign('', operation));
            }
        });
        
        setStocks(stocksOperation.sort((a, b) => a.ticket - b.ticket));
        // const sumTotal = stocksOperation.reduce((a, b) => {
        //     return a.add(b.total);
        // }, SUM(0, 0));
        // setTotal(sumTotal);
        
        // setPurchaseCost(prevState => {
        //     const sum = operation.operacao === 'C'
        //         ? SUM(prevState, operation.total).value
        //         : !operation.isSubscription ? DIVIDER(prevState, operation.total).value : prevState;
        //     return sum
        // });
    }, [operations]);
    
    return {
        stocks
    }
};