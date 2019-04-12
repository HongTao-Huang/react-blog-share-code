import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import authActions from './actions'
import routers from './router'
import {NotFound} from 'pages'
import {Page} from 'components'
import Loadable from 'react-loadable';

const MyLoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>没有</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(authActions.getAuthInfo());
  }

  render() {
    return (
        <Router>
          <Switch>
            {
              routers.map((item, index) => {
                const LoadableComponent = Loadable({
                  loader: () => import(`${item.component}/index`),
                  loading: MyLoadingComponent
                });
                return <Route key={index} path={item.path} exact render={props => (
                    <Page {...props}>
                      {
                        !item.auth
                            ? (<LoadableComponent {...props} />)
                            : (this.props.isLogin
                                ? (<LoadableComponent {...props} />)
                                : this.props.isLogin === undefined
                                    ? null
                                    : (<Redirect to={{ pathname: "/login", state: {from: props.location}
                                }}/>)
                            )
                      }
                    </Page>
                )}>
                </Route>
              })
            }
            <Route component={NotFound}/>
          </Switch>
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    user: state.userReducer.user
  }
};

export default connect(mapStateToProps)(App);
