import React, { useEffect, useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import { useMedia } from '../Hooks/useMedia';
import { setIsMobile } from '../../models/MediaModels';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  card: {
    minWidth: 275,
    padding: 20,
    marginTop: 10,
  },
  cardDesktop: {
    minWidth: 275,
    padding: 20,
    marginTop: 10,
    minHeight: '85vh',
  },
  hide: {
    display: 'none',
  },
});

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const isMobile = useMedia(756);

  const classes = useStyles({ isMobile });

  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPage(0);
        break;
      case '/add':
        setPage(1);
        break;
      case '/user':
        setPage(2);
        break;
      default:
        if (location.pathname.includes('news')) {
          setPage(3);
        }
    }
  }, [location.pathname]);

  const handleLink = (newPage: number) => {
    switch (newPage) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/add');
        break;
      case 2:
        history.push('/user');
        break;
      default:
        history.push('/');
    }
    setPage(newPage);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Card className={classes.card}>
            {children && children}
          </Card>
          <BottomNavigation
            value={page}
            onChange={(event, newValue) => {
              handleLink(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction icon={<HomeIcon />} />
            <BottomNavigationAction icon={<AddCircleOutlineIcon />} />
            <BottomNavigationAction icon={<PersonIcon />} />
            <BottomNavigationAction className={classes.hide} label="Новость" />
          </BottomNavigation>
        </>
      ) : (
        <>
          <AppBar position="static" color="default">
            <Tabs
              value={page}
              onChange={(event, newValue) => {
                handleLink(newValue);
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Новости" {...a11yProps(0)} />
              <Tab label="Добавить новость" {...a11yProps(1)} />
              <Tab label="Пользователь" {...a11yProps(2)} />
              <Tab className={classes.hide} label="Новость" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <Container maxWidth="md">
            <Card className={classes.cardDesktop}>
              {children && children}
            </Card>
          </Container>

        </>
      )}
    </>
  );
};

export default Layout;
