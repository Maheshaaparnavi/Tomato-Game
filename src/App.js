import './App.css';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import backgroundImage from './menueUntitleddesign.png';
import TimeComponent from './TimeComponent';


function Main() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`}}>
      <br/><br/><br/>  
      <Header/>
      <TimeComponent />
      <HomePage/>
      <Footer/>
    
    </div>
  );
}

export default Main;


