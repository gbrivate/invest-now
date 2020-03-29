/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { useEffect, useState } from 'react';

import XLSX from 'xlsx';
import { b3Fiis } from '../api';
import { Date } from '../utils';

const useFileUpload = () => {
    const [operations, setOperations] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [fileCEI, setFileCEI] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);
    const [total, setTotal] = useState(0);
    const [dividends, setDividends] = useState(0);
    const [purchaseCost, setPurchaseCost] = useState(0);
    const [profit, setProfit] = useState(0);
    
    useEffect(() => {
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
                        let aporte = {};
                        const dateOperation = line.__EMPTY_1 && line.__EMPTY_1.trim();
                        aporte.data = dateOperation && Date.FROM_STRING(dateOperation);
                        aporte.operacao = line.__EMPTY_3 && line.__EMPTY_3.trim(); // compra/venda
                        aporte.ticket = line.__EMPTY_6; // compra/venda
                        aporte.qtde = line.__EMPTY_8; // quantidade
                        aporte.price = line.__EMPTY_9; // valor unidade
                        aporte.total = line.__EMPTY_10; // total
                        aporte.isFII = !!b3Fiis.find(f => f.code === aporte.ticket);
                        setOperations(previousState => previousState.concat(aporte));
                        setTotal(pr => aporte.operacao === 'C' ? pr + aporte.total : pr - aporte.total)
                    }
                })
            });
        }
        setLoadingFile(false);
        setOperations(prev=> prev.sort((a, b) => b.data - a.data));
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
        
        onChangeHandler
    }
    
};

export default useFileUpload;