import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import withAuthorizationRouter from '../Session/withAuthorizationRouter';
import {
  AnalyticDashboard,
  Parent,
  Profile, Timeline,
  ProductPage, CheckoutPage, Invoice,
  BlankPage, AuthenticatedPage,
  Photos, Error, NotFound
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          { /* Home */ }
          <Route exact path="/" component={AnalyticDashboard} />
          { /* Posts */ }
          <Route exact path="/posts" component={Parent} />
          { /* Pages */ }
          <Route exact path="/app/pages" component={Parent} />
          <Route path="/app/pages/product-detail" component={ProductPage} />
          <Route path="/app/pages/checkout" component={CheckoutPage} />
          <Route path="/app/pages/invoice" component={Invoice} />
          <Route path="/app/pages/user-profile" component={Profile} />
          <Route path="/app/pages/timeline" component={Timeline} />
          <Route path="/app/pages/authenticated-page" component={withAuthorizationRouter(AuthenticatedPage)} />
          <Route path="/app/pages/blank-page" component={BlankPage} />
          <Route path="/app/pages/photo-gallery" component={Photos} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          { /* Default */ }
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
