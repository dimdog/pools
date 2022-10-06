import React, {useContext, useState, useEffect} from 'react';
import { DataContext } from './DataProvider';
import {DataGrid} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

export function PlayerEntries(props){
    const {playerData} = useContext(DataContext);
    const [playerDataRows, setplayerDataRows] = useState([]);
    const [columns, setColumns] = useState([
        { field: 'name', headerName: 'Name', width: 100 },
    ]);
    console.log("playerDataRows")
    console.log(playerDataRows);
    console.log("columns");
    console.log(columns);
    console.log("-");

    useEffect(() => {
        if (columns.length === 1 && Object.keys(playerData).length > 0){ // WARNING WARNING WARNING
            const newColumns = Object.keys(playerData[0]).map(x => {
                return {field: x, headerName: x, width: 100}
            }).filter(x => x.field !== "name");
            setColumns(x => [...x, ...newColumns])
        }
        setplayerDataRows(playerData.map(x => {return {...x, id: x.name};}));
    }, [playerData, columns]);

    return (
        <div style={{ height: 50+(playerData.length*50), width: 700}}>
            <Typography>
                Player Entries 
            </Typography>
            <DataGrid
                disableColumnMenu
                disableSelectionOnClick
                hideFooter
                density={'compact'}
                rows={Object.values(playerDataRows)}
                columns={columns}
                pageSize={20}
            />
        </div>
    );
}