import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useRef } from 'react';
import Login from './Signin';
import Tomoto from './Tomatina.jpeg';
import { Typography, colors } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from '@material-ui/core';
import Signin from './Signin';

function RegisterHandle(NewUserName, NewPassword, NewConfirmPassword) {  // Function to handle registration
    if (NewUserName && NewPassword && NewConfirmPassword) {       // Check if all fields are filled
        if (NewPassword === NewConfirmPassword) {            // Check if password and confirm password match
            fetch(`http://localhost:8000/Server/UserProfile/${NewUserName}`)  // Fetch user profile data to check if username already exists
                .then(response => response.json())
                .then(Data => {
                    if (!Data) { // If username doesn't exist, proceed with registration
                        fetch('http://localhost:8000/Server/Register', {   // Register new user 
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                UserID: null,
                                Name: NewUserName,
                                Password: NewPassword,
                                ChallengeDate: "00000000",
                                DailyStreaks: 0,
                                Rank: 0,
                                BestTime: 60,
                                GamesPlayed: 0,
                                GamesWon: 0
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("REGISTER");
                                console.log(data);
                                alert("Successfully signed up! Please sign in to play the game");
                                ReactDOM.render(<Signin />, document.getElementById('Box'));  // Render Signin component after successful registration
                            })
                            .catch(error => {
                                console.error(error);
                                console.log("EROR registering new user     " + error);
                            });
                    }
                    else {
                        alert("Username Already Exists"); // If username already exists, show alert
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Can Not Connect At The Moment: Server Update On Progress.");
                });

        }
        else {
            alert("Password & Confirm Password doesn't match");  // If password and confirm password don't match, show alert
        }
    }
    else {
        alert("Please fill Username, Password & Confirm Password"); // If any field is empty, show alert
    }
}

export default function Signup() {  // React component for Signup form
    const usernameRef = useRef(); // useRef to get input values
    const passwordRef = useRef();
    const ConfirmpasswordRef = useRef();
    return (
       
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={Tomoto} alt="Image" style={{ width: '110%', height: '100%' }} />
                    <Typography style={{ marginTop: '-490px' }} variant="h4" component="h1" align="center" >
                        Welcome to Tomoto Game
                    </Typography>
                </div>
                <div className="col-md-6">

                    <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%', marginLeft: '40%', marginTop: '5%' }}> <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" /></div>
                    <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{ width: "225px", backgroundColor: 'lightblue', borderColor: 'lightblue',textDecoration:'none' }} onClick={() => ReactDOM.render(<Signin />, document.getElementById('Box'))}>Sign Up</Link>
                    <br /><br /><br />
                    <div className="input-group mb-3">
                        <InputAdornment position="start" style={{ color: 'black', marginTop: '5%' }}>
                            <PersonIcon />
                        </InputAdornment>
                     
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="Username" ref={usernameRef} />
                    </div>
                    <div className="input-group mb-3">
                        <InputAdornment position="start" style={{ color: 'black', marginTop: '5%' }}>
                            <LockIcon />
                        </InputAdornment>
                       
                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="Password" ref={passwordRef} />
                    </div>
                    <div className="input-group mb-3">
                        <InputAdornment position="start" style={{ color: 'black', marginTop: '5%' }}>
                            <LockIcon />
                        </InputAdornment>
                     
                        <input type="password" className="form-control" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="ConfirmPassword" ref={ConfirmpasswordRef} />
                    </div>
                    <button style={{ backgroundColor: '#303f9f', borderColor: '#303f9f' }} type="button" className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => RegisterHandle(usernameRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}> Sign Up</button>
                    <br /><br /><br /><br />
                </div>
            </div>
        </div>
    );
}
