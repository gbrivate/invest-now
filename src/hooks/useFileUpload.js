/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { useEffect, useState } from 'react';

import XLSX from 'xlsx';
import { b3Fiis } from '../api';
import { Date } from '../utils';

export const useFileUpload = () => {
    const [operations, setOperations] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [fileCEI, setFileCEI] = useState(null);
    
    useEffect(() => {
        setOperations([]);
        if (fileCEI) {
            fileCEI.SheetNames.forEach(sheetName => {
                const rowObj = XLSX.utils.sheet_to_row_object_array(fileCEI.Sheets[sheetName]);
                const indexBegin = rowObj.findIndex(row => row.__EMPTY_1 === 'Data Negócio');
                const indexLast = rowObj.findIndex(row => row.__EMPTY_1 === 'Subreports within table/matrix cells are ignored.');
                let isCustomerName = false;
                
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
                            operation.isSubscription = true;
                        }
                        operation.qtde = line.__EMPTY_8; // quantidade
                        operation.price = line.__EMPTY_9; // valor unidade
                        operation.total = line.__EMPTY_10; // total
                        operation.isFII = !!b3Fiis.find(f => f.code === operation.ticket);
                        setOperations(previousState => previousState.concat(operation));
                    }
                });
            });
            
        }
        setOperations(prev => prev.sort((a, b) => b.data - a.data));
    }, [fileCEI]);
    
    const onChangeHandler = event => {
        if (event.target) {
            setOperations([]);
            const input = event.target;
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result;
                const wb = XLSX.read(fileData, {type: 'binary'});
                setFileCEI(wb);
            };
            reader.readAsBinaryString(input.files[0]);
        }
    };
    
    return {
        customerName,
        operations,
        setFileCEI,
        onChangeHandler
    }
};