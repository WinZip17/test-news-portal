import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useStore } from 'effector-react';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';
import AddNews from './components/AddNews';
import Layout from './components/Layout';
import User from './components/User';
import { $userGetStatus } from './models/UserModels';
import TransitionsModal from './components/TransitionsModal';
import Auth from './components/Auth';
import { getMeFx } from './models/UserModels/userEffects';
import Preloader from './components/Preloader';

const App = () => {
  const { user, isLoadingGetMe } = useStore($userGetStatus);

  useEffect(() => {
    getMeFx();
  }, []);

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
            { isLoadingGetMe ? <Preloader /> : (user ? <User /> : <Auth />) }
          </Route>
        </Switch>
      </Layout>
      <TransitionsModal />
    </Router>
  );
};

export default App;
