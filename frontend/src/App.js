import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import './styles/index.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [registered, setRegistered] = useState(false);

    return (
        <Router>
            <nav>
                <ul className="nav-links">
                    {!loggedIn && !registered && <li><Link to="/register">Register</Link></li>}
                    {!loggedIn && registered && <li><Link to="/">Login</Link></li>}
                    {loggedIn && <li><Link to="/quiz">Quiz Page</Link></li>}
                    {loggedIn && <li><Link to="/results">Results</Link></li>}
                    {loggedIn && <li><Link to="/leaderboard">Leaderboard</Link></li>}
                </ul>
            </nav>
            <Switch>
                <Route exact path="/register">
                    <Register setRegistered={setRegistered} />
                </Route>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/quiz" /> : <Login setLoggedIn={setLoggedIn} />}
                </Route>
                <Route path="/quiz">
                    {loggedIn ? <QuizPage /> : <Redirect to="/" />}
                </Route>
                <Route path="/results">
                    {loggedIn ? <Results /> : <Redirect to="/" />}
                </Route>
                <Route path="/leaderboard">
                    {loggedIn ? <Leaderboard /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
