

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
import Reimburse from './components/reimburse';
import NewsList from './components/news_list';


export default (
  <Route path="/" component={App} >
    <IndexRoute component={Nav}/>
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />

    <Route path="search" component={RequireAuth(Search)} />

    <Route path="signupCompany" component={SignupCompany} />
    <Route path="signup" component={Signup} />

    <Route path="/allmdicalrecord" component={RequireAuth(Mdicalrecord)} />
    <Route path="/reimburse/:serial" component={RequireAuth(Reimburse)} />

    <Route path="/newslist" component={RequireAuth(NewsList)} />

  </Route>
);