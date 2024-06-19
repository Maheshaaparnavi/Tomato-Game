
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import backgroundImage from './Tomatina.jpeg';
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tomoto from './Tomatina.jpeg';
import Signup from './Signup';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#1299E4',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

function LoginHandle(CurrentUserName, CurrentPassword) {
  if (CurrentUserName && CurrentPassword) {  // Check if username and password are provided
    fetch(`http://localhost:8000/Server/UserProfile/${CurrentUserName}`)
      .then(response => response.json())
      .then(Data => {
        if (Data && CurrentPassword === Data.Password) { // Check if user exists and password matches
          CurrentUserNameSingleton.setUserName(Data);
          ReactDOM.render(<HomeLinks />, document.getElementById('Box')); // Render HomeLinks component
        } else {
          alert("Invalid Username & Password"); // Alert for invalid credentials
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Can Not Connect At The Moment: Server Update On Progress.");  // Alert for server connection error
      });
  } else {
    alert("Please fill Username & Password");
  }
}

const Signin = () => {
  const classes = useStyles();
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* Left side with image */}
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div style={{ marginTop: '25%' }}>
          <Typography style={{ marginTop: '-98%' }} variant="h4" component="h1" align="center" >
            Welcome to Tomoto Game
          </Typography>
        </div>
      </Grid>
      {/* Right side with form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: "#9CD0FD" }}>
        <div className={classes.formContainer}>
          <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
            <img src={Tomoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
          </div>
          <Typography component="h1" variant="h5"
            style={{ color: "white", marginTop: "25%", fontWeight: 'bold', fontSize: "30px" }}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <div className={classes.input} style={{marginTop:'25%'}}>
              <Input
                type="text"
                placeholder="Username"
                inputRef={usernameRef}
                fullWidth
                autoFocus
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
            </div>
            <div className={classes.input}>
              <Input
                type="password"
                placeholder="Password"
                inputRef={passwordRef}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
              />
            </div>
            <Button style={{marginTop:'25%'}}
              type="button"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => LoginHandle(usernameRef.current.value, passwordRef.current.value)}
              fullWidth
            >
              Sign In
            </Button>
            <Typography style={{marginTop:'15%',color:'white'}}>Don't have an account? SignUp now <Button style={{color: "white",marginTop:'5%'}}  
            type="button"
            variant="contained"
              color="primary"
             fullWidth onClick={() => ReactDOM.render(<Signup />, document.getElementById('Box'))}>Sign Up</Button></Typography>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signin;
