/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { useEffect, useState } from 'react';

import XLSX from 'xlsx';
import { b3Fiis } from '../api';
import { Date, CURRENCY, SUM, DIVIDER } from '../utils';

const useFileUpload = () => {
    const [operations, setOperations] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [fileCEI, setFileCEI] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);
    const [total, setTotal] = useState(0.0);
    const [dividends, setDividends] = useState(0.0);
    const [purchaseCost, setPurchaseCost] = useState(0.0);
    const [profit, setProfit] = useState(0.0);
    
    useEffect(() => {
        setOperations([]);
        setTotal(0);
        setPurchaseCost(0);
        if (fileCEI) {
            fileCEI.SheetNames.forEach(sheetName => {
                const rowObj = XLSX.utils.sheet_to_row_object_array(fileCEI.Sheets[sheetName]);
                const indexBegin = rowObj.findIndex(row => row.__EMPTY_1 === 'Data Negócio');
                const indexLast = rowObj.findIndex(row => row.__EMPTY_1 === 'Subreports within table/matrix cells are ignored.');
                let isCustomerName = false;
                
                let stocksOperation = [];
                
                rowObj.forEach((line, index) => {
                    if (isCustomerName) {
                        setCustomerName(line.__EMPTY_1.toLowerCase());
                        isCustomerName = false;
                    }
                    if (line.__EMPTY_1 === 'Nome do Cliente') {
                        isCustomerName = true;
                    }
                    
                    if (index > indexBegin && index < indexLast) {
                        let operation = {};
                        const dateOperation = line.__EMPTY_1 && line.__EMPTY_1.trim();
                        operation.data = dateOperation && Date.FROM_STRING(dateOperation);
                        operation.operacao = line.__EMPTY_3 && line.__EMPTY_3.trim(); // compra/venda
                        operation.ticket = line.__EMPTY_6; // compra/venda
                        if (operation.ticket.indexOf('F', 5) !== -1) {
                            operation.ticket = operation.ticket.slice(0, 5);
                        } else if (operation.ticket.length > 5 && operation.ticket.indexOf('1', 5) === -1) {
                            operation.ticket = operation.ticket.slice(0, 5) + '1';
                            operation.isSubscription = true;
                        }
                        operation.qtde = line.__EMPTY_8; // quantidade
                        operation.price = line.__EMPTY_9; // valor unidade
                        operation.total = line.__EMPTY_10; // total
                        operation.isFII = !!b3Fiis.find(f => f.code === operation.ticket);
                        
                        setOperations(previousState => previousState.concat(operation));
                        
                        setPurchaseCost(prevState => {
                            const sum = operation.operacao === 'C'
                                ? SUM(prevState, operation.total).value
                                : !operation.isSubscription ? DIVIDER(prevState, operation.total).value : prevState;
                            return sum
                        });
                        
                        if (!operation.isSubscription) {
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
                                    stock.qtde -= operation.qtde;
                                    if (stock.qtde === 0) {
                                        stocksOperation.splice(index, 1);
                                        stock.profit = 0;
                                    } else {
                                        stock.total = Math.round((stock.total - operation.total) * 100) / 100;
                                        stock.averagePrice = stock.total / stock.qtde;
                                    }
                                    if (stock.total < 0) {
                                        stock.profit = stock.total;
                                        setProfit(prevState => prevState + Math.abs(stock.total))
                                    }
                                }
                            } else {
                                stocksOperation.push(Object.assign('', operation));
                            }
                        }
                    }
                });
                
                setStocks(stocksOperation.sort((a, b) => a.ticket - b.ticket));
                const sumTotal = stocksOperation.reduce((a, b) => {
                    return a.add(b.total);
                }, SUM(0, 0));
                setTotal(sumTotal);
            });
            
        }
        setLoadingFile(false);
        setOperations(prev => prev.sort((a, b) => b.data - a.data));
    }, [fileCEI]);
    
    const onChangeHandler = event => {
        setOperations([]);
        setLoadingFile(true);
        const input = event.target;
        const reader = new FileReader();
        reader.onload = () => {
            const fileData = reader.result;
            const wb = XLSX.read(fileData, {type: 'binary'});
            setFileCEI(wb);
        };
        reader.readAsBinaryString(input.files[0]);
    };
    
    return {
        customerName,
        operations,
        loadingFile,
        setFileCEI,
        total,
        dividends,
        profit,
        purchaseCost,
        stocks,
        
        onChangeHandler
    }
    
};

export default useFileUpload;