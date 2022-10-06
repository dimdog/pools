import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { PlayerStandings } from './components/PlayerStandings';
import { Typography } from '@mui/material';
import { ContestantStandings } from './components/ContestantStandings';
import { ContestantRounds } from './components/ContestantRounds';
import { PlayerEntries } from './components/PlayerEntries';


export function Base(props){


    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
                    <Grid2 item mdOffset={3} xs={6}>
                        <Typography variant="h3">
                            Survivor Pool Standings
                        </Typography>
                    </Grid2>
                </Grid2>
                <Grid2 item mdOffset={1} xs={1}>
                    <PlayerStandings />
                </Grid2>
                <Grid2 item mdOffset={0} xs={4}>
                    <PlayerEntries />
                </Grid2>
                <Grid2 item mdOffset={0} xs={4}>
                    <ContestantStandings />
                </Grid2>
                <Grid2 item mdOffset={1} xs={10}>
                    <ContestantRounds />
                </Grid2>
            </Grid2>
        </Box>
    );
}

