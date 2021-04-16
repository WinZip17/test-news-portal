import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';
import AddNews from "./components/AddNews";
import Layout from './components/Layout';
import User from './components/User';
import { getMeFx } from './models/UserModels';
import TransitionsModal from './components/TransitionsModal';

const App = () => {

  useEffect(() => {
    getMeFx()
  }, [])

  return (
    <Router>
      <Layout>
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
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </Layout>
      <TransitionsModal />
    </Router>
  );
}

export default App;
