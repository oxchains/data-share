
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      spin : false,
      error: null,
      actionResult: ''
    };
  }

  hideModal = () => {
    this.setState({
      isModalOpen: false
    });
  };
  handleFormSubmit({ name, mobile, userrealname,userinfo,usertype,password }) {
    this.setState({ spin:true });
    if(name && password && mobile)
      this.props.signupUser({ name, mobile, userrealname,userinfo,usertype, password }, err => {
        this.setState({ isModalOpen: true , error: err , actionResult: err||'注册成功!' , spin:false });
      });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger alert-dismissable">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({ input, label, type, icon, meta: { touched, error } }) {
    return (
    <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      <span className={`glyphicon glyphicon-${icon} form-control-feedback`}></span>
      <div className="help-block with-errors">{touched && error ? error : ''}</div>
    </div>
  )}

  render() {
    const { handleSubmit} = this.props;

    return (
      <div>
        <div className="login-box">
          <div className="login-logo">
          </div>
          <div className="login-box-body">
            <p className="login-box-msg" style={{fontSize: 24+'px'}}>用户注册</p>
            {this.renderAlert()}
            <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="name" component={this.renderField} type="text"  label="身份证号码"  />
              <Field name="mobile" component={this.renderField} type="text"  label="手机号"  />
              <Field name="userrealname" component={this.renderField} type="text"  label="真实姓名"  />
              {/*<Field name="userId" component={this.renderField} type="text"  label="身份证号码" />*/}
              <Field name="userinfo" component={this.renderField} type="text" label="用户信息" />
              <Field name="usertype" component={this.renderField} type="text" label="用户类型"  />
              <Field name="password" component={this.renderField} type="password" label="密码" icon="lock" />
              <Field name="passwordConfirm" component={this.renderField} type="password" label="确认密码" icon="lock" />
              <div className="row">
                <div className="col-xs-8">
                </div>
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat"><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 注册</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>提示:</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p className={this.state.error?'text-red':'text-green'}>
              {this.state.actionResult}
            </p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              关闭
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


const validate = values => {
  const errors = {};

  if(!values.name) {
    errors.name = '用户名不能为空';
  }

  if(!values.mobile) {
    errors.mobile = '手机号不能为空';
  }
    if(!values.userrealname) {
        errors.userrealname = '真实姓名不能为空';
    }
    if(!values.userId) {
        errors.userId = '身份证号码不能为空';
    }
    if(!values.userinfo) {
        errors.userinfo = '用户信息不能为空';
    }
    if(!values.usertype) {
        errors.usertype = '用户类型不能为空';
    }

  if(!values.password) {
    errors.password = '密码不能为空';
  }

  if(!values.passwordConfirm) {
    errors.passwordConfirm = '确认密码不能为空';
  }

  if(values.passwordConfirm && values.passwordConfirm != values.password) {
    errors.passwordConfirm = '两次输入密码不一致';
  }

  return errors
};

function mapStateToProps(state) {
  return {
    success: state.auth.authenticated,
    errorMessage: state.auth.error
  };
}

const reduxSignupForm = reduxForm({
  form: 'SignForm',
  validate
})(Signup);

export default connect(mapStateToProps, { signupUser })(reduxSignupForm);