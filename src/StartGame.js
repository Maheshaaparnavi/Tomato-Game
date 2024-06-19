import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import Player from './Player';
import Timer from './Timer';
import BestTime from './BestTime';
import CurrentUserNameSingleton from './UserSingleton';
import CurrentLevelSingleton from './LevelSingleton';
import CurrentDailyChallengesSingleton from './DailyChallengesSingleton';
import CurrentDailyStreaksSingleton from './DailyStreaksSingleton';
import { Link } from '@material-ui/core';

async function UpdateGamesWon() {
    let UserData = CurrentUserNameSingleton.getUserName();
    let GamesWon = UserData.GamesWon;
    if (GamesWon === null) { // Increment the number of games won
        GamesWon = 1;
    } else {
        GamesWon = GamesWon + 1;
    }

    await fetch(`http://localhost:8000/Server/GamesWon/${UserData.Name}`, { // Update the number of games won in the database
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GamesWon: GamesWon,
        }),
    })
        .catch((error) => {
            console.log('Error:', error);
        });

    await fetch(`http://localhost:8000/Server/UserProfile/${UserData.Name}`) // Update user data in the singleton
        .then(response => response.json())
        .then(Data => {
            CurrentUserNameSingleton.setUserName(Data);
        })
        .catch(error => console.error('Error:', error));
}

async function UpdateGamesPlayed() {
    let UserData = CurrentUserNameSingleton.getUserName(); // Get user data
    let GamesPlayed2 = UserData.GamesPlayed;
    if (GamesPlayed2 === null) {  // Increment the number of games played
        GamesPlayed2 = 1;
    } else {
        GamesPlayed2 = GamesPlayed2 + 1;
    }
    await fetch(`http://localhost:8000/Server/GamesPlayed/${UserData.Name}`, {  // Update the number of games played in the database
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GamesPlayed: GamesPlayed2,
        }),
    })
        .then(response => response.json())
        .then(Data => {
            console.table(Data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });

    await fetch(`http://localhost:8000/Server/UserProfile/${UserData.Name}`)  // Update user data in the singleton
        .then(response => response.json())
        .then(Data => {
            CurrentUserNameSingleton.setUserName(Data);
        })
        .catch(error => console.error('Error:', error));
}

async function UpdateDailyStreaks() { // Function to update the daily streaks of the user
    let UserData = CurrentUserNameSingleton.getUserName();   // Get user data
    let DailyStreaks = CurrentDailyStreaksSingleton.getDailyStreaks();
    if ((parseInt(DailyStreaks) > parseInt(UserData.DailyStreaks)) || (parseInt(UserData.DailyStreaks) === null)) { // Check if the current daily streak is greater than the stored daily streak
        await fetch(`http://localhost:8000/Server/DailyStreaks/${UserData.Name}`, {  // Update the daily streaks in the database
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DailyStreaks: DailyStreaks,
            }),
        })
            .then(response => response.json())
            .then(data =>
                console.table(data)
            )
            .catch((error) => {
                console.error('Error:', error);
            });

        await fetch(`http://localhost:8000/Server/UserProfile/${UserData.Name}`)
            .then(response => response.json())
            .then(Data => {
                CurrentUserNameSingleton.setUserName(Data);
            })
            .catch(error => console.error('Error:', error));
    }
}

async function UpdateChallengeDate() {
    let UserData = CurrentUserNameSingleton.getUserName();
    const CurrentDate = new Date();
    let ChallengeDate = "" + CurrentDate.getFullYear() + (CurrentDate.getMonth() + 1) + CurrentDate.getDate() + "";
    await fetch(`http://localhost:8000/Server/ChallengeDate/${UserData.Name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ChallengeDate: ChallengeDate,
        }),
    })
        .then(response => response.json())
        .then(Data => {
            console.table(Data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });

    await fetch(`http://localhost:8000/Server/UserProfile/${UserData.Name}`)
        .then(response => response.json())
        .then(Data => {
            CurrentUserNameSingleton.setUserName(Data);
        })
        .catch(error => console.error('Error:', error));
}

export function GameOver({ score }) {
    return (
        <div style={{ borderColor: 'darkblue', marginTop: '-35px' }}>
            <h3 style={{ color: 'green', marginTop: '15px' }}>Score: {score}</h3>
            <i className="bi bi-heartbreak-fill btn btn-danger btn-lg m-4 fs-2 fw-bold" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue' }}></i><br />
            <button className="bi bi-arrow-clockwise btn btn-success btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<StartGame />, document.getElementById('Box'))} style={{ borderColor: 'darkblue' }}>Play Again</button>
        </div>
    );
}

function GameWon() {
    return (
        <div>
            <Link className="btn btn-danger btn-lg m-4 fw-bold" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue',textDecoration:'none' }}>Correct</Link>
            <i className="bi bi-hand-thumbs-up-fill btn btn-danger btn-lg m-4" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue' }}></i><br />
            <button className="bi bi-arrow-clockwise btn btn-danger btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<StartGame />, document.getElementById('Box'))} style={{ backgroundColor: '#04AA6D', borderColor: 'darkblue' }}></button>
        </div>
    );
}

function GameIncorrect() {
    return (
        <div>
            <Link className="btn btn-danger btn-lg m-4 fw-bold" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue',textDecoration:'none' }}>Incorrect</Link>
            <i className="bi bi-hand-thumbs-down-fill btn btn-danger btn-lg m-4" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue' }}></i>
        </div>
    );
}

function CorrectOrNot(props) {
    const { setScore, score } = props;

    if (props.Answer === props.Correct) {
        props.stopTimer();
        CurrentDailyStreaksSingleton.setDailyStreaks(CurrentDailyStreaksSingleton.getDailyStreaks() + 1);
        UpdateGamesWon();
        let newScore = score + 10;
        const gamesPlayed = CurrentUserNameSingleton.getUserName().GamesPlayed || 0;
        if (gamesPlayed >= 5) {
            newScore *= 5;
        }

        setScore(newScore);

        ReactDOM.render(<GameWon />, document.getElementById('InputAnswer'));
    } else {
        props.setHowManyHearts(props.HowManyHearts - 1);
        ReactDOM.render(<Player HowManyHearts={(props.HowManyHearts) - 1} />, document.getElementById('PlayerHere'));
        if (parseInt(props.HowManyHearts) === 1) {
            props.stopTimer();
            ReactDOM.render(<GameOver score={score} />, document.getElementById('InputAnswer'));
        } else {
            ReactDOM.render(<GameIncorrect />, document.getElementById('CoN'));
        }
    }

    if (CurrentDailyChallengesSingleton.getDailyChallenges()) {
        UpdateDailyStreaks();
    }
}

function Game(props) {
    const inputRef = useRef();
    const [HowManyHearts, setHowManyHearts] = useState(props.HowManyHearts);

    return (
        <div className="card text-white" style={{ background: 'transparent', border: 'transparent', borderColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{ width: "225px", backgroundColor: '#04AA6D', borderColor: 'darkblue',textDecoration:'none' }} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Game</Link>
            <img src={props.Tomato.question} className="card-img-top" alt="Tomato API Failed" style={{ objectFit: 'cover', backgroundColor: '#04AA6D' }} />
            <div id="InputAnswer" className="card-body" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none' }}>
                <div className="input-group mb-3">
                    <span className="input-group-text bi bi-123 btn btn-danger" id="AnswerText" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue' }}></span>
                    <input type="text" className="form-control" placeholder="Answer" aria-label="Answer" aria-describedby="AnswerText" ref={inputRef} />
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" className="bi bi-arrow-return-right btn btn-danger fw-bold" style={{ cursor: 'auto', backgroundColor: '#04AA6D', borderColor: 'darkblue' }} onClick={() => ReactDOM.render(<CorrectOrNot Correct={parseInt(props.Tomato.solution)} Answer={parseInt(inputRef.current.value)} HowManyHearts={HowManyHearts} setHowManyHearts={setHowManyHearts} stopTimer={props.stopTimer} setScore={props.setScore} score={props.score} />, document.getElementById('CoN'))}>Submit</button>
                </div>
                <div id="CoN"></div>
                <div id="Best"></div>
            </div>
        </div>
    );
}

export default function StartGame() {
    const [score, setScore] = useState(0);

    UpdateGamesPlayed(); // Update the number of games played

    if (CurrentDailyChallengesSingleton.getDailyChallenges()) {  // Update the challenge date if daily challenges are enabled
        UpdateChallengeDate(); 
    }

    let TimeLeft;
    let TimeElapsed = 0;

    let Level = CurrentLevelSingleton.getLevel();  // Get the level of the user and set the time left accordingly

    if (Level === 1) {
        TimeLeft = 40;
    }
    else if (Level === 2) {
        TimeLeft = 30;
    }
    else if (Level === 3) {
        TimeLeft = 20;
    }
    else if (Level === 4) {
        TimeLeft = 10;
    }
    else {
        TimeLeft = 5;
    }

    let OneSecPass = setInterval(() => { // Start the timer
        if (TimeLeft > 0) {
            TimeLeft = (TimeLeft - 1);
            TimeElapsed = (TimeElapsed + 1);
            if (document.getElementById('AnswerText')) {
                ReactDOM.render(<Timer TimeLeft={TimeLeft} TimeElapsed={TimeElapsed} />, document.getElementById('TimerHere'));
            }
            else {
                clearInterval(OneSecPass);
            }
        } else {
            clearInterval(OneSecPass);
            ReactDOM.render(<GameOver score={score} />, document.getElementById('InputAnswer'));
        }
    }, 1000);

    const stopTimer = () => { // Function to stop the timer
        clearInterval(OneSecPass);
        BestTime(TimeElapsed);
    };

    fetch('https://marcconrad.com/uob/tomato/api.php')  // Fetch a new tomato question from the API and render the game component
        .then(response => response.json())
        .then(Tomato => {
            ReactDOM.render(<Game Tomato={Tomato} HowManyHearts={3} stopTimer={stopTimer} setScore={setScore} score={score} />, document.getElementById('Box'));
        })
        .catch(error => console.error('Error:', error));
    return null;
}
