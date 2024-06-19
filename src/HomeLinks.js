import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Player from './Player';
import StartGame from './StartGame';
import Level from './Level';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';
import CurrentUserNameSingleton from './UserSingleton';
import CurrentDailyChallengesSingleton from './DailyChallengesSingleton';
import CurrentDailyStreaksSingleton from './DailyStreaksSingleton';
import CurrentLevelSingleton from './LevelSingleton';
import { Link } from '@material-ui/core';
import Tomoto from './Tomatina.jpeg';
import Signin from './Signin';

// Function to check if daily challenges should be displayed
function DailyChallenges(){
    let UserData = CurrentUserNameSingleton.getUserName();
    const CurrentDate = new Date();
    if((""+CurrentDate.getFullYear()+(CurrentDate.getMonth()+1)+CurrentDate.getDate()+"") === UserData.ChallengeDate){
        return(true);
    }
    else{
        return(false);
    }
}
// React component for HomeLinks
export default function HomeLinks(){
     // Render Player component to 'PlayerHere' div
    ReactDOM.render(<Player/>, document.getElementById('PlayerHere'));
    // Render empty div to 'TimerHere' div
    ReactDOM.render(<div></div>, document.getElementById('TimerHere'));

    console.log(DailyChallenges());   // Log the result of DailyChallenges function
    return(
        <div style={{backgroundColor: 'rgba(173, 216, 230, 0.5)',height:'100%',width:'100%'}}>
            
            <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{width:"225px",backgroundColor:'#04AA6D',boxShadow:'0 9px 8px -5px #02895b',borderColor:'Highlight',textDecoration:'none'}} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Main Menue</Link><br/>
          
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                        </div>
                        
            <button className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => {
                ReactDOM.render(<Level />, document.getElementById('Box'));
                CurrentDailyChallengesSingleton.setDailyChallenges(false);
            }} style={{width:"200px",backgroundColor:'#04AA6D',borderRadius:'25px',borderColor:'Highlight'}}>Start Game</button><br/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                        </div>
                        
            <button className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => {
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
                CurrentDailyChallengesSingleton.setDailyChallenges(true);
                CurrentDailyStreaksSingleton.setDailyStreaks(0);
                CurrentLevelSingleton.setLevel(4);
            }} style={{width:"200px",backgroundColor:'#04AA6D',borderRadius:'25px',borderColor:'Highlight'}} disabled={DailyChallenges() ? true : null}>Daily Challenges</button><br/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                        </div>
            <button style={{backgroundColor:'#04AA6D',borderRadius:'25px',borderColor:'Highlight',width:"200px"}} className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Leaderboard />, document.getElementById('Box'))} >Leaderboard</button><br/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                        </div>
            <button className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))} style={{width:"200px",backgroundColor:'#04AA6D',borderRadius:'25px',borderColor:'Highlight'}}>Profile</button><br/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                        </div>
            
            <button className="btn btn-danger btn-lg m-2 fw-bold" onClick={() => {
                ReactDOM.render(<div></div>, document.getElementById('PlayerHere')); 
                ReactDOM.render(<div></div>, document.getElementById('TimerHere'));
                ReactDOM.render(<Signin/>, document.getElementById('Box'));
            }} style={{width:"200px",backgroundColor:'#04AA6D',borderRadius:'25px',borderColor:'Highlight'}}>Logout</button><br/>
        </div>
        </div>
    );
}