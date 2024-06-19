import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from '@material-ui/core';

export default function Timer(props){
    return(
        <div className="container-fluids" >
            <Link className="btn btn-danger btn-lg m-3" style={{cursor: 'auto', backgroundColor: '#04AA6D',borderColor:'darkblue',textDecoration:'none'}}>
                &nbsp;&nbsp;&nbsp;
                <p className="fs-1 fw-bold">{props.TimeLeft}</p>
                <p className="fs-1 fw-bold"><i className="bi bi-hourglass-split"></i></p>
                <p className="fs-1 fw-bold">{props.TimeElapsed}</p>
            </Link>
            <div id="SoN"></div>
        </div>
    );
}