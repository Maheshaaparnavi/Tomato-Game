import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Tomoto from './Tomatina.jpeg'
import { Link } from '@material-ui/core';

export default function Header(){
    return(
        <div className="container-fluids">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{cursor:'default', background: 'rgba(10, 0, 0, 0)' }}>
                <Link className="navbar-brand fs-2 fw-bold font-arial " id="PageNameA" style={{ color:'darkblue',textDecoration:'none' }} >&nbsp;&nbsp;&nbsp;<img src={Tomoto} id="MaheshaIMG" height="35px" width="35px" className="rounded-5" /> Tomoto Game</Link>
            </nav>
        </div>
    );
}