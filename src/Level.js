import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import StartGame from './StartGame';
import CurrentLevelSingleton from './LevelSingleton';
import { Link } from '@material-ui/core';

export default function Level() {
    return (
        <div>
            <Link className="btn btn-danger m-4 fs-2 fw-bold" style={{ width: "225px", backgroundColor: '#04AA6D', borderColor: 'darkblue' }} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Levels</Link>
            <br /><br /><br />
            <button className="btn btn-danger btn-lg m-4 fw-bold" onClick={() => {
                CurrentLevelSingleton.setLevel(1);
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
            }} style={{ width: "200px", backgroundColor: '#04AA6D', borderColor: 'darkblue' }}>
                Easy
            </button><br />
            <button className="btn btn-danger btn-lg m-4 fw-bold" onClick={() => {
                CurrentLevelSingleton.setLevel(2);
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
            }} style={{ width: "200px", backgroundColor: '#04AA6D', borderColor: 'darkblue' }}>
                Medium
            </button><br />
            <button className="btn btn-danger btn-lg m-4 fw-bold" onClick={() => {
                CurrentLevelSingleton.setLevel(3);
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
            }} style={{ width: "200px", backgroundColor: '#04AA6D', borderColor: 'darkblue' }}>
                Hard
            </button>
            <br /><br /><br />
        </div>
    );
}