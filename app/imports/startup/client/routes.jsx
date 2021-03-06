import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from '../../ui/App.jsx';
import Tasklist from '../../ui/Tasklist.jsx';
import Calendar from '../../ui/Calendar.jsx';

import AboutUsPage from '../../ui/AboutUsPage.jsx';
import SignUpPage from '../../ui/SignUpPage.jsx';
import SignInPage from '../../ui/SignInPage.jsx';
import ForgotPasswordPage from '../../ui/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../ui/ResetPasswordPage.jsx';
import HelpCenterPage from '../../ui/HelpCenterPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Tasklist} />
      <Route path="calendar" component={Calendar} />
      <Route path="aboutus" component={AboutUsPage} />
      <Route path="signup" component={SignUpPage} />
      <Route path="signin" component={SignInPage} />
      <Route path="forgotpassword" component={ForgotPasswordPage} />
      <Route path="reset-password/:token" component={ResetPasswordPage} />
      <Route path="helpcenter" component={HelpCenterPage} />
    </Route>
  </Router>
);
