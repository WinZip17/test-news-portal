import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';
import AddNews from "./components/AddNews";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Layout from './components/Layout';


const App = () => {

  return (
      <Router>
        <Layout>
          <Container maxWidth="lg">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">AddNews</Link>
              </li>
              <li>
                <Link to="/sign-up">registration</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <NewsList />
              </Route>
              <Route path="/news/:id">
                <NewsPage />
              </Route>
              <Route path="/add">
                <AddNews />
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>

              <Route path="/sign-up">
                <SignUp />
              </Route>
            </Switch>
          </Container>
        </Layout>
      </Router>
  );
}

export default App;
