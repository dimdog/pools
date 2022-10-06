import React, {useContext} from 'react';
import { DataContext } from './DataProvider';
import {DataGrid} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'score', headerName: 'Score', width:80}
];

export function PlayerStandings(props){
    const {players} = useContext(DataContext);


    return (
        <div style={{ height: 350, width: 200}}>
            <Typography>
                Player Standings
            </Typography>
            <DataGrid
                disableColumnMenu
                disableSelectionOnClick
                hideFooter
                density={'compact'}
                rows={Object.values(players)}
                columns={columns}
                pageSize={20}
            />
        </div>
    );
}

