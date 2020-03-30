import React from 'react';
import { Button } from '@material-ui/core';

export const FileImport = props => {
    const {onChangeHandler} = props;
    return (
        <div>
            <input
                onChange={onChangeHandler}
                accept=".xls"
                id="uploadCEI"
                type="file"
                className="display-none"
            />
            <label htmlFor="uploadCEI">
                <Button variant="contained" color="primary" component="span">
                    Upload Arquivo CEI *.XLS
                </Button>
            </label>
        </div>
    )
}