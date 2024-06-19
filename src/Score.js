
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameComponent() {
    const [currentUserName, setCurrentUserName] = useState('Player1');
    const [userProfile, setUserProfile] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchUserProfile();
        fetchLeaderboard();
    }, [currentUserName]);

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/Server/UserProfile/${currentUserName}`);
            setUserProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile.', error);
        }
    };

    // Fetch leaderboard
    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('http://localhost:8000/Server/Leaderboard');
            setLeaderboard(response.data);
        } catch (error) {
            console.error('Failed to fetch leaderboard.', error);
        }
    };

    // Update score and user profile after game over
    const gameOverOperations = async () => {
        try {
            // Post new score
            await axios.post(`http://localhost:8000/Server/scores/${currentUserName}`, { score });
            // Update user profile for games played and won (adjust logic as needed)
            await axios.put(`http://localhost:8000/Server/GamesPlayed/${currentUserName}`, { GamesPlayed: userProfile.GamesPlayed + 1 });
            // Simulating a win update
            await axios.put(`http://localhost:8000/Server/Won/${currentUserName}`, { Won: userProfile.Won + 1 });
            console.log('Game over operations completed.');

            // Refresh user profile and leaderboard
            fetchUserProfile();
            fetchLeaderboard();
        } catch (error) {
            console.error('Failed to complete game over operations.', error);
        }
    };

    return (
        <div>
            <h1>Game Component</h1>
            <p>Score: {score}</p>
            <button onClick={() => setScore(score + 10)}>Increase Score</button>
            <button onClick={gameOverOperations}>Game Over</button>

            {userProfile && (
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {userProfile.Name}</p>
                    <p>Games Played: {userProfile.GamesPlayed}</p>
                    <p>Games Won: {userProfile.Won}</p>
                </div>
            )}

            <div>
                <h2>Leaderboard</h2>
                {leaderboard.map((user, index) => (
                    <p key={index}>{user.Name}: {user.Rank}</p>
                ))}
            </div>
        </div>
    );
}

export default GameComponent;
