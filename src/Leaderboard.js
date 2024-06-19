import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import { Link } from '@material-ui/core';
import BestTime from './BestTime';
import React, { useState, useEffect } from 'react';





function LeaderboardUI(props) {
    console.log(props.Data);
    return (

        <tr>
            <td><Link className="btn btn-danger m-1 fw-bold" style={{ width: "40px", cursor: 'auto', backgroundColor: '#04AA6D', textDecoration: 'none', borderColor: 'darkblue' }}><i className={`bi bi-${props.Data.Rank}-square-fill`}></i></Link></td>
            <td><Link className="btn btn-danger m-1 fw-bold" style={{ width: "150px", cursor: 'auto', backgroundColor: '#04AA6D', textDecoration: 'none', borderColor: 'darkblue' }}>{props.Data.Name}</Link></td>
            <td><Link className="btn btn-danger m-1 fw-bold" style={{ width: "50px", cursor: 'auto', backgroundColor: '#04AA6D', textDecoration: 'none', borderColor: 'darkblue' }}>{props.Data.SuperTime}</Link></td>
            <td><Link className="btn btn-danger m-1 fw-bold" style={{ width: "50px", cursor: 'auto', backgroundColor: '#04AA6D', textDecoration: 'none', borderColor: 'darkblue' }}>{props.Data.Won}</Link></td>
        </tr>
    );
}



function UsersOfLeaderboard(props) {
    useEffect(() => {  // Use useEffect to handle side effects
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/Server/Leaderboard/${props.Rank}`);
                const Data = await response.json();
                console.log(Data);  // Check the output here
                ReactDOM.render(<LeaderboardUI Data={Data} />, document.getElementById('tr' + props.Rank));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [props.Rank]);  // Dependency array to re-run this effect when Rank changes

    return null;
}



export default function Leaderboard() {
    fetch('http://localhost:8000/Server/UpdateRanks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

    }

    )
        .catch(error => console.error('Error:', error));
    return (
        <div>
            <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{ width: "225px", backgroundColor: '#62E6B5', borderColor: 'darkblue', textDecoration: 'none' }} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Leaderboard</Link>
            <table className="text-start">
                <tbody>
                    <tr>
                        <tr>
                            <th><Link className="btn btn-danger m-1 fw-bold" style={{ width: "40px", cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue', textDecoration: 'none' }}><i className="bi bi-trophy-fill"></i></Link></th>
                            <th><Link className="btn btn-danger m-1 fw-bold" style={{ width: "150px", cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue', textDecoration: 'none' }}><i className="bi bi-person-fill"></i></Link></th>
                            <th><Link className="btn btn-danger m-1 fw-bold" style={{ width: "50px", cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue', textDecoration: 'none' }}><i className="bi bi-hourglass-split"></i></Link></th>
                            <th><Link className="btn btn-danger m-1 fw-bold" style={{ width: "50px", cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue', textDecoration: 'none' }}><i className="bi bi-fire"></i></Link></th>
                        </tr>
                    </tr>
                    <tr id="tr1">
                        <UsersOfLeaderboard Rank={1} />
                    </tr>
                    <tr id="tr2">
                        <UsersOfLeaderboard Rank={2} />
                    </tr>
                    <tr id="tr3">
                        <UsersOfLeaderboard Rank={3} />
                    </tr>
                    <tr id="tr4">
                        <UsersOfLeaderboard Rank={4} />
                    </tr>
                    <tr id="tr5">
                        <UsersOfLeaderboard Rank={5} />
                    </tr>
                    <tr id="tr6">
                        <UsersOfLeaderboard Rank={6} />
                    </tr>
                    <tr id="tr7">
                        <UsersOfLeaderboard Rank={7} />
                    </tr>
                    <tr id="tr8">
                        <UsersOfLeaderboard Rank={8} />
                    </tr>
                    <tr id="tr9">
                        <UsersOfLeaderboard Rank={9} />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

