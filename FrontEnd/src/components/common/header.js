

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const logo = './public/img/logo.jpg';

class Header extends  Component {

  renderUserInfo() {
      const biz= JSON.parse(localStorage.getItem('biz'));
    if(this.props.authenticated) {
      //const user = JSON.parse(localStorage.getItem('user'));
      const username= localStorage.getItem('username');
      const avatar = `https://gravatar.com/avatar/oxchain.org/user/${username}?s=100&d=retro`;
        const biz= JSON.parse(localStorage.getItem('biz'));
      return (
        <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li className="dropdown user user-menu">
            <Link href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img className="user-image" alt="User Image" src={avatar}/>
              <span className="hidden-xs">{username}</span>
            </Link>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img className="img-circle" alt="User Image" src={avatar}/>

                <p>
                  {username}
                  <small></small>
                </p>
              </li>
              <li className="user-body">
                <div className="row">
                </div>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <Link className={`btn btn-default btn-flat`} href="#" >设置</Link>
                  {/*<Link className={`btn btn-default btn-flat`} href="/selfinfo" >设置</Link>*/}
                  {/*<Link className={`btn btn-default btn-flat ${biz? "hidden" : "show"}`} href="/selfinfo">设置</Link>*/}
                  {/*<Link className={`btn btn-default btn-flat ${biz? "show" : "hidden"}`} href="#" >设置</Link>*/}
                </div>
                <div className="pull-right">
                  <Link href="/signout" className="btn btn-default btn-flat">退出登录</Link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>);
    } else {
      return <div></div>
    }
  }

  render() {

    return (
      <header className="main-header">
        <Link href="/" className="logo">
          <span className="logo-mini"><img src={logo} style={{width:25+'px'}} /></span>
          <span className="logo-lg"><img src={logo} style={{width:30+'px',marginRight:15+'px',marginTop:-5+'px'}} /><b>电子病历</b></span>
        </Link>
        <nav className="navbar navbar-static-top">
          <Link href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </Link>

          {this.renderUserInfo()}

        </nav>
      </header>
    );
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);