import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';


function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  });

  useEffect(() => {
    axios
      .get('http://localhost:6060/auth/auth', {
        headers: {
          accessToken: sessionStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true
          });
        }
      });
  }, [authState]);

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setAuthState({ username: '', id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Registration </Link>
              </>
            ) : (
              <>
                <Link to="/"> Home Page </Link>
                <Link to="/createpost"> Create A Post </Link>
              </>
            )}

         <div className="loggedInContainer">
            <h1> {authState.username}</h1>
            {authState.status && <button onClick={logout}>Logout</button>}
          </div>
          </div>

          

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
