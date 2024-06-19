import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import React, { useEffect, useState } from 'react';
import { Link } from '@material-ui/core';

export default function UserProfile(){
    ReactDOM.render(<div></div>, document.getElementById('TimerHere'));
    ReactDOM.render(<div></div>, document.getElementById('PlayerHere')); 
    
    let UserData = CurrentUserNameSingleton.getUserName();

    

    return(
        <div>
        <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{width:"225px", backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Profile</Link>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Username</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.Name}</Link></td>
                    </tr>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Longest Streaks</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.DailyStreaks}</Link></td>
                    </tr>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Rank</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.Rank}</Link></td>
                    </tr>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Best Time</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.BestTime}</Link></td>
                    </tr>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Games Played</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.GamesPlayed}</Link></td>
                    </tr>
                    <tr>
                        <th><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>Games Won</Link></th>
                        <td><Link className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none',color:'white'}}>{UserData.GamesWon}</Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}