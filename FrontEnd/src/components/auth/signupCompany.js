

  import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupCompany } from '../../actions/auth';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class SignupCompany extends Component {
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

  handleFormSubmit(values) {
    this.setState({ spin:true });
    this.props.signupCompany(values, err=>{
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

  renderField({ input, label, type, required, meta: { touched, error } }) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label htmlFor="name" className="col-sm-3 control-label"><b className="text-danger">{required?'*':''}</b> {label}</label>
        <div className="col-sm-9 input-group">
          <input {...input} placeholder={label} type={type} className="form-control" />
          <div className="help-block with-errors">{touched && error ? error : ''}</div>
        </div>
      </div>
    )
  }

  render(){
    return (<div className="row">
    <div className="col-md-6 col-md-offset-3">
      <div className="box box-info">
        <div className="box-header with-border text-center">
          <h3 className="box-title">企业用户申请</h3>
        </div>

        {this.renderAlert()}

        <form role="form" data-toggle="validator" className="form-horizontal"  onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="box-body">
            <Field name="name" component={this.renderField} type="text"  label="公司名称" required={true}/>
            <Field name="mobile" component={this.renderField} type="text"  label="手机号" required={true}/>
            <Field name="password" component={this.renderField} type="text"  label="密码" required={true}/>
            <Field name="address" component={this.renderField} type="text"  label="地址" required={true}/>
            <Field name="taxpayer" component={this.renderField} type="text"  label="纳税人识别号" required={true}/>
            <Field name="bank" component={this.renderField} type="text"  label="开户行" required={true}/>
            <Field name="account" component={this.renderField} type="text"  label="账户" required={true}/>

          </div>

          <div className="box-footer text-center">
            <button type="submit" className="btn btn-success">保存</button>
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
  </div>);
  }
};

const validate = values => {
  const errors = {};

  if(!values.name) {
    errors.name = '公司名称不能为空';
  }

  if(!values.mobile) {
    errors.mobile = '手机号不能为空';
  }

  if(!values.password) {
    errors.password = '密码不能为空';
  }

  if(!values.address) {
    errors.address = '地址不能为空';
  }

  if(!values.taxpayer) {
    errors.taxpayer = '纳税人识别号不能为空';
  }

  if(!values.bank) {
    errors.bank = '开户行不能为空';
  }

  if(!values.account) {
    errors.account = '账户不能为空';
  }

  return errors
};

function mapStateToProps(state) {
  return {
    success: state.auth.authenticated,
    errorMessage: state.auth.error
  };
}

const reduxSignupCompanyForm = reduxForm({
  form: 'SignupCompanyForm',
  validate
})(SignupCompany);

export default connect(mapStateToProps, { signupCompany })(reduxSignupCompanyForm);