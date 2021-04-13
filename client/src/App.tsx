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
import Layout from './components/Layout';

const App = () => {

  return (
    <Router>
      <Layout>
        <Container maxWidth="md">
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
