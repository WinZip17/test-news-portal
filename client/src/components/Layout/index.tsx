import React, {useEffect, useState} from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory,
  useLocation
} from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
});

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {

  const classes = useStyles()

  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPage(0)
        break;
      case '/add':
        setPage(1)
        break;
      case '/sign-in':
        setPage(2)
        break;
      default:
        setPage(0)
    }
  },[location.pathname])

  const handleLink = (page: number) => {
    switch (page) {
      case 0:
        history.push('/')
        break;
      case 1:
        history.push('/add')
        break;
      case 2:
        history.push('/sign-in')
        break;
      default:
        history.push('/=')
    }
    setPage(page)
  }

  return (
      <>
        {children && children}
        <BottomNavigation
          value={page}
          onChange={(event, newValue) => {
            console.log('newValue' , newValue)
            handleLink(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Новости" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Добавить новость" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Пользователь" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </>
    )
}

export default Layout
