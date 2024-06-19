import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer(){
  return(
    <footer className="footer text-light py-1 bottom" style={{ background: 'linear-gradient(to bottom, transparent 0%, #143F5C 100%)' }}>
      <div className="container">
        <br/><br/><hr />
        <div className="text-center">
          <a href="/node_modules" style={{ cursor:'default', color:'rgba(250, 210, 210, 0.9)', textDecoration:'none' }}>&copy; 2024 | Mahesha | 2335814</a>
          <br/>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="https://www.instagram.com/" style={{ cursor:'default', fontsize: '20px', color:'rgba(250, 210, 210, 0.9)' }}><i className="bi bi-instagram"></i></a></li>
            <li className="list-inline-item"><a href="https://www.linkedin.com/in/mahesha-aparnavi-9ab9b5197/" style={{ cursor:'default', fontsize: '20px', color:'rgba(250, 210, 210, 0.9)' }}><i className="bi bi-linkedin"></i></a></li>
            <li className="list-inline-item"><a href="https://github.com/Maheshaaparnavi" style={{ cursor:'default', fontsize: '20px', color:'rgba(250, 210, 210, 0.9)' }}><i className="bi bi-github"></i></a></li>
            
          </ul>
        </div>
      </div>
    </footer>
  );
}