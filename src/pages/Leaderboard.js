import './styling/Leaderboard.css'
import ChangeUp from './images/change_up.png'
import ChangeDown from './images/change_down.png'
import ChangeNone from './images/change_none.png'
import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

function renderLeaderBoard(players, lastSessionLeaderboard) {
// dafd
    var tiePos = 0;
    return (
        players.map((p, ind) => {
            var liClassname = "player";
            var gainLoss = p.chip_delta;
            var posChange = lastSessionLeaderboard.get(p.id).ind - ind
            var changeImg = ChangeNone;
            var pos = ind + 1;

            if (ind !== 0 && players[ind - 1].chipTotal === p.chipTotal) {
                if (tiePos === 0) {
                    tiePos = ind;
                    pos = tiePos;
                } 

            } else {
                tiePos = 0;
            }

            if (posChange < 0) {
                changeImg = ChangeDown
            } else if(posChange > 0) { 
                changeImg = ChangeUp
            } 

            if (p.chipTotal < 0) {
                liClassname = liClassname.concat(" depshere");
            } else if (p.chipTotal === 0) {
                liClassname = liClassname.concat(" broke")
            } else {
                liClassname = liClassname.concat(" profitor")
            }

            if (pos % 2 === 0) {
                liClassname = liClassname.concat(" odd-position")
            } else {
                liClassname = liClassname.concat(" even-position")
            }

            return(
                <li key={ind} className={liClassname}>
                    <div className='pos-change lb-data'>
                        <img src={changeImg} className='change-img'></img>
                        {pos}
                    </div>
                    <div className='player-name lb-data'>
                        {p.name}
                    </div>
                    <div className='chip-total lb-data'>
                        {p.current_chips}
                    </div>
                    <div className='last-total lb-data'>
                        {p.chip_total}
                    </div>
                    <div className='gain-loss lb-data'>
                        {gainLoss}
                    </div>
                </li>
            )
    }));
}


function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [lastSessionLeaderboardMap, setLastSessionLeaderboardMap] = useState([])
    
    useEffect (() => {
        const fetchData = async () => {
            const {data, error} = await supabase.rpc('get_leaderboard');
            if (error) {
                console.log(error)
            }
            var id = 0;
            data.forEach(p => {
                p["current_chips"] = p.chip_delta + p.chip_total;
                p["id"] = id++;
            });

            if (data.length < 3) {
                data[2] =  {name: '', chip_delta: 0, chip_total: 0, current_chips: 0}
            }

            if (data.length < 2) {
                data[1] =  {name: '', chip_delta: 0, chip_total: 0, current_chips: 0}
            }

            data.sort(function(a, b) {return b.chip_total - a.chip_total;});
            setPlayers(data);
    
            var lastSessionSortedLb = structuredClone(data);
            lastSessionSortedLb.sort(function(a, b) { return b.chip_total - a.chip_total; });
    
            var lastSessionLb = new Map(lastSessionSortedLb.map((pl, ind) => [pl.id, {...pl, ind}]));
            setLastSessionLeaderboardMap(lastSessionLb)
        };

        fetchData();

    }, []);

    if (players.length === 0) {
        return (<div></div>);
    }

    
    return (
        <div className='leaderboard'>
            <div className='top-three'>
                <div className='podium second'>
                    <div className='podium-name'>
                        <div>
                            {players[1]?.name}
                        </div>
                    </div>
                    <div className='card king'>
                        <div>K</div>
                        <div>♤</div>
                    </div>
                </div>
                <div className='podium first'>
                    <div className='podium-name'>
                        {players[0]?.name}
                        
                    </div>
                    <div className='card ace'>
                        <div>A</div>
                        <div>♤</div>
                    </div>
                </div>
                <div className='podium third'>
                    <div className='podium-name'>
                        {players[2].name}
                    </div>
                    <div className='card queen'>
                        <div>Q</div>
                        <div>♤</div>
                    </div>
                </div>
            </div>
            <div className='board'>
                <div className='leaderboard-labels'>
                    <div className='pos-label lb-label'>Position</div>
                    <div className='name-label lb-label'>Name</div>
                    <div className='chip-total-label lb-label'>Chips</div>
                    <div className='last-session-chips-label lb-label'>Last Session</div>
                    <div className='gain-loss lb-label'>Gain/Loss</div>
                </div>
                <ul>
                    {renderLeaderBoard(players, lastSessionLeaderboardMap)}
                </ul>
            </div>

        </div>
    );
}

export default Leaderboard;
