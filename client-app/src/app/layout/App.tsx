import React, { Fragment, FC, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ActivityForm } from '../../features/activites/form/ActivityForm';
import ActivityDetails from '../../features/activites/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ProfilePage from '../../features/profiles/ProfilePage';
import ModalContainer from '../common/modals/ModalContainer';

const App: FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);
  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route
                  exact
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <Route
                  exact
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route
                  path="/profile/:username"
                  component={ProfilePage}
                ></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
