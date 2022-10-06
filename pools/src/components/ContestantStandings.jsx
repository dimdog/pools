import React, {useContext, useState, useEffect} from 'react';
import { DataContext } from './DataProvider';
import {DataGrid} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'score', headerName: 'Score', width:80}
];

export function ContestantStandings(props){
    const {contestants} = useContext(DataContext);
    const [contestantRows, setContestantRows] = useState([]);

    useEffect(() => {
        setContestantRows(Object.keys(contestants).map(key => {
            return {name: key, score: contestants[key], id: key}
        }));
    }, [contestants]);

    return (
        <div style={{ height: 750, width: 200}}>
            <Typography>
                Contestant Standings
            </Typography>
            <DataGrid
                disableColumnMenu
                disableSelectionOnClick
                hideFooter
                density={'compact'}
                rows={Object.values(contestantRows)}
                columns={columns}
                pageSize={20}
            />
        </div>
    );
}

