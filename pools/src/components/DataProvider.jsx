import React, {useState, useEffect, useMemo} from 'react';
import playerDataCsv from './../data/player_entries.csv';
import contestantDataCsv from './../data/contestant_entries.csv';
import Papa from 'papaparse';
const DataContext = React.createContext({});
DataContext.displayName = "DataContext";

function DataProvider(props){
    const [playerData, setPlayerData] = useState([]);
    const [contestantData, setContestantData] = useState([]);
    const [players, setPlayers] = useState([]);
    const [contestants, setContestants] = useState([]);
    const excluded_keys = useMemo(() => ['Air Date', 'Episode', 'Round', 'Event Type'], []);

    useEffect(() => {
        fetch(playerDataCsv)
            .then((r) => r.text())
            .then(text => {
                Papa.parse(text, {
                    header: true,
                    complete: function (results) {
                        setPlayerData(results.data);
                    }
                })
            })
        fetch(contestantDataCsv)
            .then((r) => r.text())
            .then(text => {
                Papa.parse(text, {
                    header: true,
                    complete: function (results) {
                        setContestantData(results.data);
                    }
                })
            })


    }, [])
    useEffect(() => {
        if (contestantData.length > 0 && playerData.length > 0){
            setContestants(Object.keys(contestantData[0])
                .map(x => x)
                .filter(x => excluded_keys.indexOf(x) === -1)
                .map(x => {
                    const score = contestantData.reduce((prev, cur) => {
                        if (!isNaN(prev)){
                            return prev + parseInt(cur[x]);
                        } else {
                            return parseInt(prev[x]) + parseInt(cur[x]);
                        }
                    })
                    return {[x] : score};
                }).reduce((prev, cur) => {
                    return {...prev, ...cur};
                }));
        }
    }, [contestantData, playerData, excluded_keys])
    useEffect(() => {
        if (Object.keys(contestants).length > 0){
            setPlayers(playerData.map(playerRow => {
                const scores = []
                for (const key of Object.keys(playerRow)){
                    if (key !== "name"){
                        const multiplier = parseInt(key);
                        scores.push(contestants[playerRow[key]]*multiplier);
                    }
                }
                const score = scores.reduce((prev, cur) => prev+cur)
                return {[playerRow.name]: {score: score, ...playerRow, id:playerRow.name}}
            }).reduce((prev, cur) => {return {...prev, ...cur}}));
        }
    }, [contestants, playerData]);
    return (
        <DataContext.Provider value={{players, contestants, playerData, contestantData}}>
            {props.children}
        </DataContext.Provider>
    );
}

export {DataProvider, DataContext};