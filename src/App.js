import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionCreator from './actions'
import routers from './router'
import {NotFound} from 'pages'
import {Page} from 'components'

class App extends Component {
  render() {
    this.props.dispatch(actionCreator.getAuthInfo());
    console.log(this.props, 'props');
    return (
        <Router>
          <Switch>
            {
              routers.map((item, index) => {
                return <Route key={index} path={item.path} exact render={props => (
                    <Page>
                      {
                        !item.auth
                            ? (<item.component {...props} />)
                            : (this.props.isLogin
                                ? (<item.component {...props} />)
                                : (<Redirect to={{
                                  pathname: "/login",
                                  state: {from: props.location}
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
    isLogin: state.userReducer.isLogin
  }
};

export default connect(mapStateToProps)(App);
