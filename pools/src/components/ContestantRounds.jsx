import React, {useContext, useState, useEffect} from 'react';
import { DataContext } from './DataProvider';
import {DataGrid} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

export function ContestantRounds(props){
    const {contestants, contestantData} = useContext(DataContext);
    const [contestantDataRows, setContestantDataRows] = useState([]);
    const [columns, setColumns] = useState([
        { field: 'Air Date', headerName: 'Air Date', width: 100 },
        { field: 'Episode', headerName: 'Episode', width: 100 },
        { field: 'Event Type', headerName: 'Event Type', width:150}
    ]);

    useEffect(() => {
        setContestantDataRows(contestantData.map(x => {
            return {...x, id: x["Air Date"]+x["Event Type"]}
        }));
        if (columns.length === 3){ // WARNING WARNING WARNING
            const newColumns = Object.keys(contestants).map(x => {
                return {field: x, headerName: x, width: 80}
            });
            setColumns(x => [...x, ...newColumns])
        }
    }, [contestants, contestantData, columns]);

    return (
        <div style={{ height: 50+(contestantDataRows.length*50), width: 1300}}>
            <Typography>
                Contestant Standings
            </Typography>
            <DataGrid
                disableColumnMenu
                disableSelectionOnClick
                hideFooter
                density={'compact'}
                rows={Object.values(contestantDataRows)}
                columns={columns}
                pageSize={20}
            />
        </div>
    );
}

