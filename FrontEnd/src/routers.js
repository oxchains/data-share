
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RequireAuth from './components/auth/require_auth';
import App from './components/app';
import Nav from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import SignupCompany from './components/auth/signupCompany';
import Search from './components/search';
import Mdicalrecord from './components/mdicalrecord';
import NewsList from './components/news_list';
import  Mdicalrecordofours from './components/mdicalrecord_ofours';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Nav}/>
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="signupCompany" component={SignupCompany} />
    <Route path="signup" component={Signup} />
      <Route path="search" component={RequireAuth(Search)} />
      <Route path="/newslist" component={RequireAuth(NewsList)} />
      <Route path="/allmdicalrecord" component={RequireAuth(Mdicalrecord)} />
      <Route path="/mdicalrecordofours" component={RequireAuth(Mdicalrecordofours)} />
  </Route>
);